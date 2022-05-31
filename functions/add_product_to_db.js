"use strict";

// import { supabase } from "../src/lib/supabase";
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

// import { loadStripe } from "@stripe/stripe-js";

// let stripe;
// const whSecret =
//     whsec_0286817c32a272cf74a6260d4ebcf58cfa2dc19c850cb0c4ff8d24f734d9999b;

// const getStripe = () => {
//     if (!stripe) {
//         stripe = loadStripe(process.env.GATSBY_STRIPE_SK);
//     }
//     return stripe;
// };

// getStripe();

exports.handler = async ({ body, headers }) => {
    try {
        // verify webhook is valid
        console.log(stripe);

        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers["stripe-signature"],
            process.env.GATSBY_STRIPE_WEBHOOK_SECRET
        );
        // console.log(stripeEvent);

        // pull data from database where the updated values are different.
        return {
            statusCode: 200,
            body: JSON.stringify("Cool"),
        };
    } catch (error) {
        console.error("Stripe webhook failed: ", error);
    }
};
