// "use strict";
// const fetch = require("node-fetch");

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

// const createClient = require("supabase-js");
const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};
const supabase = getSupabaseClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

// const endpointSecret =
//     "whsec_0286817c32a272cf74a6260d4ebcf58cfa2dc19c850cb0c4ff8d24f734d9999b";

const incProducts = [
    {
        product_id: "prod_elite",
        default_price: "price_923sdfl4jdf",
        name: "birdhouse v1",
        desc: "a charming little birdhouse",
        images: ["www.youtube.com"],
        url: "www.localhost8888/products",
        active: true,
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
    const { data, error } = await supabase
        .from("product_inventory")
        .insert([
            { max_qty: max_qty, inventory: inv_amount, product_id: prod_id },
        ]);
    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                `Unable to insert inventory for product '${prod_id} for error ${error}'`
            ),
        };
    }
    return data[0].id;
};

exports.handler = async (event) => {
    try {
        const stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            event.headers["stripe-signature"],
            process.env.GATSBY_STRIPE_PRODUCT_EVENTS_WEBHOOK_SECRET
        );
        console.log("TYPE", stripeEvent.type);

        // console.log(JSON.parse(event.body.metadata));

        switch (stripeEvent.type) {
            // This will be product.created
            // case "setup_intent.created": {
            case "product.created": {
                const product = JSON.parse(event.body).data.object;
                console.log(product);
                const { product_type, inventory, max_qty } = product.metadata;
                console.log(product_type, inventory, max_qty);

                // Getting the category ID here is a simple array indexOf function against the categories const above. It returns the value +1 since the DB id is not index 0. Requires a small bit of maintenance since it's housed here instead of checking the DB but improves performance significantly.
                const category_id =
                    categories.indexOf(product.metadata[0].product_type) + 1;
                if (category_id === 0) {
                    throw new Error(
                        `Category '${product.metadata[0].product_type}' doesn't exist in categories array`
                    );
                }

                // inserting into inventory table
                const inventory_id = await insertIntoInventory(
                    product.metadata[0].max_qty,
                    product.metadata[0].inventory,
                    product.product_id
                );

                // Inserting into products table when product.created webhook fires.

                const { error } = await supabase.from("products").insert([
                    {
                        product_id: product.product_id,
                        default_price: product.default_price,
                        name: product.name,
                        desc: product.desc,
                        category_id: category_id,
                        inventory_id: inventory_id,
                        image_url: product.images[0],
                        project_url: product.url,
                        active: product.active,
                        likes: 0,
                        like_level: 0,
                    },
                ]);
                if (error) {
                    throw new Error(
                        `Could not insert new row in 'products' for ${product.product_id}: ${error}`
                    );
                }
                break;
            }
            // This will be product.updated
            // Will only allow changes on the following columns. If there is a change to the other column, it will instead be a new product being created. Can't change the product_id, category_id, inventory_id, likes, or like_lvl.
            case "product.updated": {
                // case "placeholder2": {
                const product = JSON.parse(event.body).data;
                const { error } = await supabase
                    .from("products")
                    .update({
                        default_price: product.default_price,
                        name: product.name,
                        desc: product.desc,
                        image_url: product.images[0],
                        project_url: product.url,
                        active: product.active,
                    })
                    .eq("product_id", product.product_id);
                if (error) {
                    throw new Error(
                        `Could not update row for ${product.product_id}: ${error}`
                    );
                }
                break;
            }
            case "product.deleted": {
                // case "setup_intent.created": {
                const product = JSON.parse(event.body).data;
                const { error } = await supabase
                    .from("products")
                    .delete()
                    .eq("product_id", product.product_id);
                if (error) {
                    throw new Error(
                        `Could not delete product: ${product.product_id}: ${error}`
                    );
                }
                break;
            }

            default: {
                throw new Error(
                    `No matching webhooks in product_events function for ${stripeEvent.type}`
                );
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ result: true }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
