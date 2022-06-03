import React, { useState, useEffect } from "react";
import * as styles from "../scss/checkout.module.scss";
// const express = require("express");
// const app = express();
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK_TEST);

// How to check Stripe account for available inventory so if I sell my own products with specific inventory, I don't oversell.
// This should be performed on a server so that it cannot be manipulated.
const getPint = () => {
    const exists = JSON.parse(localStorage.getItem("p3pint"));
    // return exists ?
};
// const compileLineItems = (items) => {
//     return {
//         pint:
//     }
// };

const compileLineItems = (items) => {
    return items.map((obj) => ({
        price: obj.default_price,
        quantity: obj.quantity,
    }));
};

/* TODO
 * customer clicks on proceed to checkout.
*  before a new session is created, a check is performed to see if there's a stripe payment intent ID saved to local storage.
* IF YES
    include that with the line items to the netlify func



 */

function Checkout(props) {
    const { cartItems } = props;
    // const { cartItems, expires, setExpires, sessionId, setSessionId } = props;
    const [loading, setLoading] = useState(false);
    // const [loading, setLoading] = useState([]);

    const lineItems = compileLineItems(cartItems);
    // const redirectToCheckout = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     const stripe = await getStripe();
    //     const { error } = await stripe.redirectToCheckout({
    //         mode: "payment",
    //         lineItems: lineItems,
    //         successUrl: `http://localhost:8000/page-2/`,
    //         cancelUrl: `http://localhost:8000/`,
    //     });
    //     console.log("checking error state");

    //     if (error) {
    //         console.warn("Error:", error);
    //         setLoading(true);
    //     }
    // };

    /* Todo
        1) When the checkout button is pressed, first perform an inventory check against the DB. If there is differing inventory, modal will popup showing details of change and cart will have automatically updated. Allow customer to modify contents before proceeding with checkout
    */

    const testing = async (event) => {
        event.preventDefault();

        // in line items, also include payment intent id. this will get stored to the localStorage as well.
        const stripe = await stripePromise;
        const session = await fetch(`/.netlify/functions/checkout`, {
            method: "POST",
            "Content-type": "application/json",
            body: JSON.stringify(lineItems),
        }).then((resp) => resp.json());

        // const { error } = await stripe.redirectToCheckout({
        //     sessionId: session.id,
        // });
        // if (error) {
        //     return console.error(`Error with checkout: ${error}`);
        // }

        console.log(session);
        // data will contain the stripe checkout session id. If the session hasnt been completed, send the expires_at value back to the cart where an "Expires in: <value>" is.
    };

    const btnStyle = !loading
        ? styles.checkout_button
        : styles.checkout_button_prevent;

    return (
        // <form className={btnStyle} onSubmit={redirectToCheckout}>
        <form className={btnStyle} onSubmit={testing}>
            <input
                className={styles.inputBtn}
                type="submit"
                value="Proceed to Checkout"
            />
        </form>
        // <button className={btnStyle} onClick={redirectToCheckout}>
        //     <p>Proceed to Checkout</p>
        // </button>
    );
}

export default Checkout;
