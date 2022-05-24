import React, { useState, useEffect } from "react";
import * as styles from "../scss/cart.module.scss";
import { BsCart, BsTrash, BsFillShieldLockFill } from "react-icons/bs";

import Checkout from "./Checkout";

function Cart(props) {
    // const { cartItems, setCartItems, onAdd, onMinus, formattedPrice } = props;
    const {
        products,
        btnClick,
        handleClick,
        onAdd,
        onMinus,
        formattedPrice,
        emptyCart,
    } = props;

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        let items = [];
        products.forEach((obj) => {
            obj.product_list.forEach((prod) => {
                if (prod.quantity > 0) {
                    items.push(prod);
                }
            });
        });
        setCartItems(items);
    }, [btnClick, products]);

    const totalPrice = formattedPrice(
        cartItems.reduce((acc, prod) => prod.quantity * prod.price + acc, 0)
    );

    const totalQty = cartItems.reduce((acc, prod) => prod.quantity + acc, 0);

    // return <div>testing</div>;

    if (cartItems.length === 0) {
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
                            <p className={styles.total_qty}>{totalQty}</p>
                        </div>
                    </div>
                    <p className={styles.total}>Total: {totalPrice}</p>
                </div>
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Qty</p>
                        <p className={styles.heading}>Product-Id</p>
                        <p className={styles.heading}>Subtotal</p>
                    </div>
                    {cartItems.map((item) => {
                        const btn = !item.clickAllowed
                            ? `${styles.button_prevent} ${styles.qty_plus_prevent}`
                            : `${styles.button} ${styles.qty_plus}`;

                        const subtotal = formattedPrice(
                            item.price * item.quantity,
                            item.currency
                        );
                        return (
                            <div key={item.id} className={styles.list_item}>
                                <div className={styles.qty_container}>
                                    <button
                                        onClick={(e) => {
                                            if (!item.clickAllowed) {
                                                e.preventDefault();
                                            } else {
                                                onAdd(item);
                                                handleClick();
                                            }
                                        }}
                                        className={btn}
                                    >
                                        +
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button
                                        onClick={(e) => {
                                            onMinus(item);
                                            handleClick();
                                        }}
                                        className={`${styles.button} ${styles.qty_minus}`}
                                    >
                                        -
                                    </button>
                                </div>
                                <p>{item.description}</p>
                                <p>{subtotal}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.buttons_container}>
                    <button
                        onClick={emptyCart}
                        className={styles.empty_cart_button}
                    >
                        <BsTrash className={styles.trash_icon} />
                    </button>
                    <Checkout
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />
                </div>
                <div className={styles.secure_checkout}>
                    <BsFillShieldLockFill />
                    <p>
                        Checkout powered by{" "}
                        <a
                            href="http://www.stripe.com"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {" "}
                            Stripe
                        </a>
                    </p>
                </div>
            </aside>
        );
}

export default Cart;
