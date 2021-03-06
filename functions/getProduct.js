// const fetch = require("node-fetch");

const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

exports.handler = async (data) => {
    const body = JSON.parse(data.body);
    const { search } = body;

    // Verifying form data is from P3D site
    const header = data.headers;
    const token = header && header.authorization.split(" ")[1];
    if (token === null) throw new Error(MESSAGES.INVALID_TOKEN);
    jwt.verify(token, process.env.P3D_SIGNATURE_KEY);

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("p3_id", search)
        .eq("active", true)
        .order("updated", { ascending: false })
        .order("inventory", { ascending: false });

    if (error) {
        console.log(error);

        return {
            statusCode: 400,
            body: JSON.stringify({
                error: `Could not fetch products from supabase from get_products function`,
            }),
        };
    }

    // console.log([...products]);

    return {
        statusCode: 200,
        // body: JSON.stringify(products),
        body: JSON.stringify({ status: 200, data: products }),
    };
};
