"use strict";

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => {
    return createClient(url, key);
};
const supabase = getSupabaseClient(
    process.env.GATSBY_SUPABASE_URL,
    process.env.GATSBY_SUPABASE_KEY
);

const HOOKS = {
    PRODUCT_CREATED: "product.created",
    PRODUCT_UPDATED: "product.updated",
    PRODUCT_DELETED: "product.deleted",
};

exports.handler = async (event) => {
    try {
        const stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            event.headers["stripe-signature"],
            process.env.GATSBY_STRIPE_PRODUCT_EVENTS_WEBHOOK_SECRET
        );
        console.log("TYPE", stripeEvent.type);

        const product = JSON.parse(event.body).data.object;

        const { name: tax_code_name } = await stripe.taxCodes.retrieve(
            product.tax_code
        );

        switch (stripeEvent.type) {
            // case "product.created": {
            case HOOKS.PRODUCT_CREATED: {
                const { error } = await supabase.from("products").insert([
                    {
                        product_id: product.id,
                        default_price: product.default_price,
                        unit_amount: 0,
                        name: product.name,
                        desc: product.description,
                        inventory: product.metadata.inventory,
                        image_url: product.metadata.image_url,
                        project_url: product.metadata.project_url,
                        active: product.active,
                        p3_id: product.metadata.p3_id,
                        currency: product.currency,
                        likes: 0,
                        like_level: 0,
                        tax_code: product.tax_code,
                        tax_code_name: tax_code_name,
                        max_qty: product.metadata.max_qty,
                        size: product.metadata.size,
                    },
                ]);
                if (error) {
                    throw new Error(
                        `Could not insert new row in 'products' for ${product.id}: ${error}`
                    );
                }
                break;
            }
            // case "product.updated": {
            case HOOKS.PRODUCT_UPDATED: {
                const price_data = await stripe.prices.retrieve(
                    product.default_price
                );

                const { error } = await supabase
                    .from("products")
                    .update({
                        default_price: product.default_price,
                        unit_amount: price_data.unit_amount,
                        currency: price_data.currency,
                        name: product.name,
                        desc: product.description,
                        image_url: product.metadata.image_url,
                        project_url: product.metadata.project_url,
                        p3_id: product.metadata.p3_id,
                        active: product.active,
                        tax_code: product.tax_code,
                        tax_code_name: tax_code_name,
                        inventory: product.metadata.inventory,
                        max_qty: product.metadata.max_qty,
                        size: product.metadata.size,
                        updated: new Date(),
                    })
                    .eq("product_id", product.id);
                if (error) {
                    throw new Error(
                        `Could not update row for ${product.id}: ${error}`
                    );
                }
                break;
            }
            case HOOKS.PRODUCT_DELETED: {
                // case "product.deleted": {
                const { error } = await supabase
                    .from("products")
                    .delete()
                    .eq("product_id", product.id);
                if (error) {
                    console.error(error);
                    throw new Error(
                        `Could not delete product: ${product.id}: ${error}`
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
