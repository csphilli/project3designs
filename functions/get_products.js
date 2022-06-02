const fetch = require("node-fetch");

exports.handler = async () => {
    let prods;
    await fetch(
        `${process.env.GATSBY_SUPABASE_URL}/rest/v1/products?select=*`,
        {
            method: "GET",
            headers: {
                apiKey: `${process.env.GATSBY_SUPABASE_KEY}`,
                Authorization: `Bearer ${process.env.GATSBY_SUPABASE_KEY}`,
            },
        }
    )
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error("Couldn't get products from Supabase");
        })
        .then((products) => {
            prods = products;
            console.log(prods);
        })
        .catch((e) => {
            return {
                statusCode: 400,
                body: JSON.stringify(`ERROR: ${e}`),
            };
        });
    return {
        statusCode: 200,
        body: JSON.stringify(prods),
    };
};
