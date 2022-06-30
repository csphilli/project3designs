import React from "react";
import Seo from "../components/Seo";
import QtyButton from "../components/inputs/QtyButton";

function Cart() {
    const updateCart = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const qty = form.get("quantity");
        console.log(`QTY: ${qty}`);
    };
    return (
        <div>
            <Seo title="Cart" />
            <h2>I am the shopping cart page</h2>
            <form onSubmit={updateCart}>
                <QtyButton />
                <button>Test</button>
            </form>
        </div>
    );
}

export default Cart;
