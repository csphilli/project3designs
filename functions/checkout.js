"use strict";
// const fetch = require("node-fetch");
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

exports.handler = async ({ body }) => {
    /*  TODO
     * If there is a product_type of 'physical' in the lineItems, I need to collect the shipping address
     * stripe checkout session should have expiration.
     * First check to see if there is an existing checkout session. If so, load it. This will prevent users from decrementing inventory all the time without buying anything.
     * Since it has expiration, physical products in database should have inventory decremented by desired amount.
     * If checkout session expires, increment the respective physical products back up by the amount.
     * Upon checkout session completed
     *   Stripe receipts sent to purchaser email
     *   Digital products should be included in receipt email. A notice of physical products will also be included in email
     *   physical products should create and send an email to a fulfillment address so that I know what I have to pack/ship. This is a proprietory address only for fulfillment!
     */

    // const session = await stripe.checkout.sessions.retrieve(
    //     'cs_test_a160i7EVUXFSrv61a4hICjdJfmnUzKUt0VKAFYmNyFzJtr2vRSOebDOETO'
    //   );

    // const session = await stripe.checkout.sessions.expire(
    //     'cs_test_a160i7EVUXFSrv61a4hICjdJfmnUzKUt0VKAFYmNyFzJtr2vRSOebDOETO'
    //   );

    try {
        const items = JSON.parse(body);

        // if there is a payment intent ID, get the customer secret key from the database.
        // Kill the checkout session
        // Delete intent id row from DB upon successful checkout session deletion.
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: items,
            // billingAddressCollection: "auto",
            // shippingAddressCollection: {
            //     allowedCountries: ["FI"],
            // },
            expires_at: Math.floor(new Date().getTime() / 1000.0 + 3600 * 1), // session expires after 1 hour
            success_url: `http://localhost8888/thank_you`,
            cancel_url: `http://localhost:8888/products`,
        });

        // return the checkout.sesssion.id. Will be used to check if the checkout has been completed or not.
        return {
            statusCode: 200,
            body: JSON.stringify(session),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Error creating checkout session: ${e}`),
        };
    }
};
