// const fetch = require("node-fetch");

const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

const ERRORS = {
    MISSING: "Missing P3D Auth Token",
};

const authorizeToken = async (data) => {
    try {
        const headers = await data.headers;
        const token = headers?.authorization.split(" ")[1];
        if (token === null) throw new Error(ERRORS.MISSING);
        jwt.verify(token, process.env.GATSBY_P3D_SIGNATURE_KEY);
        return {
            statusCode: 200,
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: {
                status: 400,
                message: `${error}`,
            },
        };
    }
};

exports.handler = async (data) => {
    try {
        // Verifies request coming from P3D
        const res = await authorizeToken(data);
        if (res.statusCode !== 200) throw new Error(res.body.message);

        const { data: products, error } = await supabase
            .from("products")
            .select("*")
            .eq("active", true)
            .order("updated", { ascending: false })
            .order("inventory", { ascending: false });

        if (error) throw new Error(error);

        return {
            statusCode: 200,
            // body: JSON.stringify(products),
            body: JSON.stringify({ status: 200, data: products }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: 400, message: `${error}` }),
        };
    }
    // Verifying form data is from P3D site
};
