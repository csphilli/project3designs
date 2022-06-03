// "use strict";
// const fetch = require("node-fetch");

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

// const createClient = require("supabase-js");
const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};
const supabaseEU = getSupabaseClient(
    process.env.GATSBY_SUPABASE_EU_URL,
    process.env.GATSBY_SUPABASE_EU_KEY
);

const endpointSecret =
    "whsec_0286817c32a272cf74a6260d4ebcf58cfa2dc19c850cb0c4ff8d24f734d9999b";

const incProducts = [
    {
        product_id: "prod_123kdfj3is",
        default_price: "price_923l4jdf",
        name: "birdhouse v1",
        desc: "a charming little birdhouse",
        images: ["www.youtube.com"],
        url: "www.localhost8888/products",
        active: true,
        created: 1654268973,
        updated: 1654268973,
        metadata: {
            max_qty: 3,
            inventory: 1,
            product_type: "digital",
        },
    },
];

// To cut down on DB lookup times, the categories here represent the exact category names in the product_catetory table as well as, and most importantly, the exact order they are in.
const categories = ["digital", "physical"];

const insertIntoInventory = async (max_qty, inv_amount, prod_id) => {
    const { data, error } = await supabaseEU
        .from("product_inventory")
        .insert([
            { max_qty: max_qty, inventory: inv_amount, product_id: prod_id },
        ]);
    if (data) {
        return data[0].id;
    }
    if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(
                `Unable to insert inventory for product '${prod_id} for error ${error}'`
            ),
        };
    }
};

exports.handler = async (event) => {
    try {
        const stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            event.headers["stripe-signature"],
            endpointSecret
        );
        switch (stripeEvent.type) {
            // Change to proper event type later
            case "setup_intent.created": {
                // Getting the category ID her a simple array indexOf function against the categories const above. It returns the value +1 since the DB id is not index 0.
                const category_id =
                    categories.indexOf(incProducts[0].metadata.product_type) +
                    1;
                if (category_id === 0) {
                    throw new Error(
                        `Category '${incProducts[0].metadata.product_type}' doesn't exist in categories array`
                    );
                }

                // inserting into inventory table
                console.time("inventory_id");
                const inventory_id = await insertIntoInventory(
                    incProducts[0].metadata.max_qty,
                    incProducts[0].metadata.inventory,
                    incProducts[0].product_id
                );
                console.timeEnd("inventory_id");

                // Inserting into products table when product.created webhook fires.
                console.time("products");
                const { data, error } = await supabaseEU
                    .from("products")
                    .insert([
                        {
                            product_id: incProducts[0].product_id,
                            default_price: incProducts[0].default_price,
                            name: incProducts[0].name,
                            desc: incProducts[0].desc,
                            category_id: category_id,
                            inventory_id: inventory_id,
                            image_url: incProducts[0].images[0],
                            project_url: incProducts[0].url,
                            created: new Date(incProducts[0].created * 1000),
                            updated: new Date(incProducts[0].updated * 1000),
                            active: incProducts[0].active,
                            likes: 0,
                            like_level: 0,
                        },
                    ]);
                console.timeEnd("products");
                if (error) {
                    throw new Error(
                        `Could not insert new row in 'products' for ${incProducts[0].product_id}: ${error}`
                    );
                }
                break;
            }

            default: {
                console.error(
                    `No matching webhooks in product_events function for ${stripeEvent.type}`
                );
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(`Tuna add to DB`),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
