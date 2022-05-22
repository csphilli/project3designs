"use strict";

exports.handler = async (event, context) => {
    console.log(context);

    // const express = require("express");
    // const app = express();
    // const stripe = require("@stripe/stripe.js")(process.env.GATSBY_STRIPE_SK);
    // const { error } = await stripe.checkout.sessions.create({
    //     success_url: "https://example.com/success",
    //     cancel_url: "https://example.com/cancel",
    //     line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }],
    //     mode: "payment",
    // });

    // if (error) {
    //     return {
    //         statusCode:
    //     }
    // }
    // console.log("fun with serverless functions");

    // const data = {
    //     name: "Mario",
    //     job: "plumber",
    //     age: 35,
    // };

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
