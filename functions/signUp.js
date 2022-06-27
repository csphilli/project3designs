/*
secret key variable GATSBY_RECAPTCHA_SECRET_KEY
*/

const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const VALIDATION_URL = "https://www.google.com/recaptcha/api/siteverify?";

const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};

const supabase = getSupabaseClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_SERVICE_KEY
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

const uniqueCheck = async (columnName, value) => {
    let { data: profiles, error } = await supabase
        .from("profiles")
        .select(columnName)
        .eq(columnName, value);

    if (profiles && profiles.length > 0) {
        return false;
        /*
        returns an array of objects
        returns [ { username: 'some name' } ]

        to extract the data:
        const [{ username }] = profiles;
        console.log(username);
        */
    }
    return true;
};

exports.handler = async (data) => {
    try {
        const body = JSON.parse(data.body);
        const header = data.headers;
        const token = header && header.authorization.split(" ")[1];
        if (token === null) throw new Error("Invalid Form Token");
        jwt.verify(token, process.env.FORM_SIGNATURE_KEY);
        if (!validateHuman(body.recaptcha)) {
            throw new Error("Bot behavior detected");
        }
        if (body.password !== body.password_again) {
            throw new Error("Passwords do not match");
        }
        const uniqueUname = await uniqueCheck("username", body.uName);
        if (!uniqueUname) {
            throw new Error("That username has been taken");
        }
        const { user, error } = await supabase.auth.signUp(
            {
                email: body.email,
                password: body.password,
            },
            {
                data: {
                    name: body.fName,
                },
            }
        );
        if (error) {
            throw new Error(error.message);
        }
        if (user) {
            const { id } = user;
            const { error: errorData } = await supabase
                .from("profiles")
                .insert([
                    {
                        user_id: id,
                        username: body.uName,
                        first_name: body.fName,
                        last_name: body.lName,
                        mailing_list: false,
                    },
                ]);
            if (errorData) throw new Error(error);
            const { error: errorLogin } = await supabase.from("logins").insert([
                {
                    user_id: id,
                    email: body.email,
                    next_allowed: Math.floor(new Date().getTime() / 1000),
                },
            ]);
            if (errorLogin) throw new Error(error);
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
