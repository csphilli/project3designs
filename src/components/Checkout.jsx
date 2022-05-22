import React, { useState } from "react";
import * as styles from "../scss/checkout.module.scss";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK_TEST);
    }
    return stripePromise;
};

// How to check Stripe account for available inventory so if I sell my own products with specific inventory, I don't oversell.
// This should be performed on a server so that it cannot be manipulated
const compileLineItems = (items) => {
    return items.map((obj) => ({
        price: obj.default_price,
        quantity: obj.quantity,
    }));
};

function Checkout(props) {
    const { cartItems, setCartItems } = props;
    const [loading, setLoading] = useState(true);
    const lineItems = compileLineItems(cartItems);
    const redirectToCheckout = async (event) => {
        event.preventDefault();
        setLoading(false);
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: lineItems,
            successUrl: `http://localhost:8000/page-2/`,
            cancelUrl: `http://localhost:8000/`,
        });
        console.log("checking error state");
        
        if (error) {
            console.warn("Error:", error);
            setLoading(false);
        }
        
    };
    
    const btnStyle = loading
        ? styles.checkout_button
        : styles.checkout_button_prevent;

    return (
        <button
            className={btnStyle}
            onClick={redirectToCheckout}
        >
            <p>Proceed to Checkout</p>
        </button>
    );
}

export default Checkout;
