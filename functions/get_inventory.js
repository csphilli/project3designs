"use strict";

const fetch = require("node-fetch");
exports.handler = async () => {
    // const data = await fetch(
    //     "https://teupdewkszzkrezbvmfe.supabase.co/rest/v1/p3d_inventory?select=*",
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             apiKey: process.env.SUPABASE_KEY,
    //             Authorization: `Bearer: ${process.env.SUPABASE_KEY}`,
    //         },
    //         // body: JSON.stringify(data),
    //     }
    // );
    return {
        statusCode: 200,
        body: "cool",
        // body: JSON.stringify(data),
    };
};
/*

curl 'https://teupdewkszzkrezbvmfe.supabase.co/rest/v1/p3d_inventory?select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"

*/
