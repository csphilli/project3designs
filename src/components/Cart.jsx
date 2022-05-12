import React from "react";
import * as styles from "../scss/cart.module.scss";
import { BsCart } from "react-icons/bs";

function Cart() {
    return (
        <aside className={styles.cart_container}>
            <div className={styles.heading_container}>
                <p className={styles.total}>€1,000</p>
                <div className={styles.cart_icon_container}>
                    <BsCart />
                    <p className={styles.total_qty}>3</p>
                </div>
            </div>
        </aside>
    );
}

export default Cart;
