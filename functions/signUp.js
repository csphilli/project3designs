/*
secret key variable GATSBY_RECAPTCHA_SECRET_KEY
*/

const fetch = require("node-fetch");

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

const uniqueUname = async (uName) => {
    let { data: profiles, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", uName);

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

// need to verify email and username are unique
exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        if (!validateHuman(body.token)) {
            throw new Error("Bot behavior detected");
        }

        // checks if username is unique
        const isUnameUnique = await uniqueUname(body.uName);

        if (isUnameUnique) {
            console.log(`username was unique`);

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
                console.log(error.message);
                throw new Error(error.message);
            }
            if (user) {
                const { id } = user;
                const { data, error } = await supabase.from("profiles").insert([
                    {
                        id: id,
                        username: body.uName,
                        first_name: body.fName,
                        last_name: body.lName,
                        mailing_list: false,
                    },
                ]);
                if (error) {
                    throw new Error(
                        "That email is already associated with an account"
                    );
                }
            }
        } else {
            throw new Error(`That username has been taken`);
        }

        return {
            statusCode: 200,
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
