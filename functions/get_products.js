// const fetch = require("node-fetch");

const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

exports.handler = async (data) => {
    // Verifying form data is from P3D site
    const header = data.headers;
    const token = header && header.authorization.split(" ")[1];
    if (token === null) throw new Error(MESSAGES.INVALID_TOKEN);
    jwt.verify(token, process.env.FORM_SIGNATURE_KEY);

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("updated", { ascending: false })
        .order("inventory", { ascending: false });

    if (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: `Could not fetch products from supabase from get_products function`,
            }),
        };
    }

    // console.log(data);

    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
    // let prods;
    // await fetch(
    //     `${process.env.GATSBY_SUPABASE_URL}/rest/v1/products?select=*`,
    //     {
    //         method: "GET",
    //         headers: {
    //             apiKey: `${process.env.GATSBY_SUPABASE_KEY}`,
    //             Authorization: `Bearer ${process.env.GATSBY_SUPABASE_KEY}`,
    //         },
    //     }
    // )
    //     .then((resp) => {
    //         if (resp.ok) {
    //             return resp.json();
    //         }
    //         throw new Error("Couldn't get products from Supabase");
    //     })
    //     .then((products) => {
    //         prods = products;
    //         console.log(prods);
    //     })
    //     .catch((e) => {
    //         return {
    //             statusCode: 400,
    //             body: JSON.stringify(`ERROR: ${e}`),
    //         };
    //     });
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(prods),
    // };
};
