import React from "react";
import Seo from "../components/Seo";
import { loadLocal } from "../lib";
import * as styles from "../scss/cart/shoppingCart.module.scss";
import { BsShieldCheck } from "react-icons/bs";

function Cart(props) {
    const cartItems = loadLocal();

    if (!cartItems) {
        return (
            <section className={styles.empty_cart_container}>
                <h2 className={styles.title}>Your cart is empty</h2>
            </section>
        );
    } else
        return (
            <form name="shoppingList" className={styles.cart_container}>
                <Seo title="Cart" />
                <div className={styles.heading_container}>
                    <h2 className={styles.title}>Your Selections:</h2>
                    <button className={styles.form_btn}>
                        <BsShieldCheck className={styles.form_btn_icon} />
                        Checkout
                    </button>
                </div>
                <fieldset>
                    <h3>Product</h3>
                    <h3>Description</h3>
                    <h3>Quantity</h3>
                    <h3>Total Price</h3>
                </fieldset>
                <div className={styles.items_container}></div>
            </form>
        );
}

export default Cart;
