// const fetch = require("node-fetch");

const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

exports.handler = async (data) => {
    try {
        console.log("Getting all products");

        const header = data.headers;
        const token = header && header.authorization.split(" ")[1];
        if (token === null) throw new Error(MESSAGES.INVALID_TOKEN);
        jwt.verify(token, process.env.P3D_SIGNATURE_KEY);

        console.log("Passed JWT verification");

        const { data: products, error } = await supabase
            .from("products")
            .select("*")
            .eq("active", true)
            .order("updated", { ascending: false })
            .order("inventory", { ascending: false });

        // console.log(data);
        if (error) throw new Error(error);

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify(error),
        };
    }
    // Verifying form data is from P3D site
};
