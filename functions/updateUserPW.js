const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const MESSAGES = {
    INVALID_TOKEN: "Invalid form token",
};

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

        // Verifying request originating from P3D
        const header = data.headers;
        const p3dToken = header && header.authorization.split(" ")[1];
        if (p3dToken === null) throw new Error(MESSAGES.INVALID_TOKEN);
        jwt.verify(p3dToken, process.env.P3D_SIGNATURE_KEY);

        const arr = body.split("&");
        const token = arr[0].split("=")[1];

        // Password check (so user knows what they typed)
        if (body.password !== body.password_again) {
            throw new Error("Passwords do not match");
        }

        const { sub: id } = jwt.verify(
            token,
            process.env.GATSBY_SUPABASE_JWT_KEY
        );

        if (!id) {
            throw new Error(
                "Password reset link has expired. Please restart the process"
            );
        }

        const { user, error } = await supabase.auth.update({
            password: body.password,
        });

        if (error) throw new Error(error);

        if (user) {
            console.log(user);
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
