const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};

const supabase = getSupabaseClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

exports.handler = async (data) => {
    try {
        const body = JSON.parse(data.body);

        // Verifying request is from P3D
        const header = data.headers;
        const token = header && header.authorization.split(" ")[1];
        if (token === null) throw new Error("Invalid Form Token");
        jwt.verify(token, process.env.FORM_SIGNATURE_KEY);

        // Bot check
        if (!validateHuman(body.recaptcha)) {
            throw new Error(MESSAGES.BOT);
        }

        let { user, session, error } = await supabase.auth.signIn({
            email: body.email,
            password: body.password,
        });
        // if (session) {
        //     const { access_token, token_type, user, expires_at } = session;
        //     console.log(
        //         `TOKEN: ${access_token} TYPE: ${token_type} USER: ${Object.keys(
        //             user
        //         )} EXPIRES_AT: ${expires_at}`
        //     );
        // }
        if (error) {
            throw new Error(error.message);
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
