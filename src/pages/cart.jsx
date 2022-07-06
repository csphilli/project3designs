import React from "react";
import Seo from "../components/Seo";
import * as styles from "../scss/cart/shoppingCart.module.scss";

function Cart() {
    return (
        <section className={styles.cart_container}>
            <Seo title="Cart" />
            <h2>I am the shopping cart page</h2>
        </section>
    );
}

export default Cart;
