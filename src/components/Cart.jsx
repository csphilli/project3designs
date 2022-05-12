import React from "react";
import * as styles from "../scss/cart.module.scss";
import { BsCart } from "react-icons/bs";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

function Cart(props) {
    const { items } = props;
    if (!items) {
        return (
            <aside className={styles.empty_cart_container}>
                <p className={styles.empty_cart_text}>No Items in Cart</p>
                <BsCart className={styles.empty_cart_icon} />
            </aside>
        );
    } else
        return (
            <aside className={styles.cart_container}>
                <div className={styles.heading_container}>
                    <div className={styles.cart_icon_container}>
                        <BsCart className={styles.cart_icon} />
                        <div className={styles.total_qty_container}>
                            <p className={styles.total_qty}>13</p>
                        </div>
                    </div>
                    <p className={styles.total}>Total: €1,000</p>
                </div>
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Qty</p>
                        <p className={styles.heading}>Product</p>
                        <p className={styles.heading}>Sum</p>
                    </div>
                    <div className={styles.list_item}>
                        <div className={styles.qty_container}>
                            <FiPlusCircle
                                className={`${styles.qty_icon} ${styles.qty_plus}`}
                            />
                            <p className={styles.qty_value}>1</p>
                            <FiMinusCircle
                                className={`${styles.qty_icon} ${styles.qty_minus}`}
                            />
                        </div>
                        <p className={styles.product_name}>name</p>
                        <p className={styles.sum}>sum</p>
                    </div>
                </div>
                <div className={styles.checkout_button_container}>
                    <button className={styles.checkout_button}>
                        Proceed to Checkout
                    </button>
                </div>
            </aside>
        );
}

export default Cart;
