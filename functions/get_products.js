exports.handler = async () => {
    const api = await fetch(
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
                return api.json();
            }
            throw new Error("Couldn't get products from Supabase");
        })
        .catch((e) => {
            console.error(`ERROR: ${e}`);
        });
};
