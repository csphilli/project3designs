const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const VALIDATION_URL = "https://www.google.com/recaptcha/api/siteverify?";
// How many attempts before account lock
const MAX_ATTEMPTS = 10;

// How many attempts before time delayed login
const TIME_ATTEMPTS = 5;

const MESSAGES = {
    LOCKED: "Account has been locked. Please use the forgot password link to unlock",
    INVALID_TOKEN: "Invalid form token",
    BOT: "Bot behavior detected",
};

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};

const supabase = getSupabaseClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

const validateHuman = async (token) => {
    const secret = process.env.GATSBY_RECAPTCHA_SECRET_KEY;
    const resp = await fetch(
        `${VALIDATION_URL}secret=${secret}&response=${token}`,
        {
            method: "POST",
        }
    );
    const data = await resp.json();
    return data.success;
};

const calcNextAllowed = (attempts) => {
    if (attempts > 4) {
        return Math.floor(new Date().getTime() + (attempts / 2) * 60 * 1000);
    } else {
        return 0;
    }
};

const getNextAllowed = async (email) => {
    const { data } = await supabase
        .from("logins")
        .select("*")
        .eq("email", email);

    return {
        next_allowed: await data[0].next_allowed,
        attempts: await data[0].attempts,
        locked: await data[0].locked,
    };
};

const resetLoginAttempts = async (email) => {
    const { error } = await supabase
        .from("logins")
        .update({
            attempts: 0,
            next_allowed: 0,
            locked: false,
        })
        .eq("email", email);
};

const timeRemaining = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const errorMessage = (ms, attempts) => {
    const time = timeRemaining(ms);
    if (attempts < 5) {
        return `You have ${
            TIME_ATTEMPTS - attempts
        } attempt(s) left before timed login penalty.`;
    } else if (attempts > 4 && attempts < MAX_ATTEMPTS) {
        return `You must wait ${time}
         before your next login attempt. ${
             MAX_ATTEMPTS - attempts
         } attempt(s) left before account lock. Consider resetting password via the 'forgot password' link below.`;
    } else if (attempts === MAX_ATTEMPTS) {
        return MESSAGES.LOCKED;
    } else return "";
};

exports.handler = async (data) => {
    try {
        const body = JSON.parse(data.body);

        // Verifying form data is from P3D site
        const header = data.headers;
        const token = header && header.authorization.split(" ")[1];
        if (token === null) throw new Error(MESSAGES.INVALID_TOKEN);
        jwt.verify(token, process.env.P3D_SIGNATURE_KEY);

        // Bot check
        if (!validateHuman(body.recaptcha)) {
            throw new Error(MESSAGES.BOT);
        }

        // Check if account has been locked
        const currTime = Math.floor(new Date().getTime());
        const { next_allowed, attempts, locked } = await getNextAllowed(
            body.email
        );
        if (locked) throw new Error(MESSAGES.LOCKED);

        // Check if user can attempt to login
        if (currTime < next_allowed) {
            throw new Error(errorMessage(next_allowed - currTime, attempts));
        }

        // Attempting to login
        let { user, session, error } = await supabase.auth.signIn({
            email: body.email,
            password: body.password,
        });

        // Login failed
        if (error) {
            const next_allowed = calcNextAllowed(attempts + 1);
            const { error: updateError } = await supabase
                .from("logins")
                .update({
                    attempts: attempts + 1,
                    next_allowed: next_allowed,
                    locked: attempts + 1 === MAX_ATTEMPTS ? true : false,
                })
                .eq("email", body.email);
            if (updateError) {
                console.log(updateError);
            }
            throw new Error(
                `${error.message}. ${errorMessage(
                    next_allowed - currTime,
                    attempts + 1
                )}`
            );
        }

        // Login Succeeded
        if (session) {
            resetLoginAttempts(body.email);
            const { access_token, token_type, user, expires_at } = session;
            // console.log(
            //     `TOKEN: ${access_token} TYPE: ${token_type} USER: ${Object.keys(
            //         user
            //     )} EXPIRES_AT: ${expires_at}`
            // );
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ token: session.access_token }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(`${error}`),
        };
    }
};
