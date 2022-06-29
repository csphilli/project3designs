const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const VALIDATION_URL = "https://www.google.com/recaptcha/api/siteverify?";

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

exports.handler = async (data) => {
    try {
        const body = JSON.parse(data.body);

        // Verifying request is from P3D
        const header = data.headers;
        const token = header && header.authorization.split(" ")[1];
        if (token === null) throw new Error("Invalid Form Token");
        jwt.verify(token, process.env.P3D_SIGNATURE_KEY);

        console.log(`Forgot, incoming email: ${body.email}`);

        // Bot check
        if (!validateHuman(body.recaptcha)) {
            throw new Error(MESSAGES.BOT);
        }

        let { data: forgotData, error } =
            await supabase.auth.api.resetPasswordForEmail(body.email);

        if (forgotData) {
            console.log(Object.keys(forgotData));
        }

        if (error) {
            throw new Error(error.message);
        }

        return {
            statusCode: 200,
            // body: JSON.stringify({ token: session.access_token }),
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
