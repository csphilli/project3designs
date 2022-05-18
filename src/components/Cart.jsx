import React, { useEffect } from "react";
import * as styles from "../scss/cart.module.scss";
import { BsCart } from "react-icons/bs";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

function Cart(props) {
    const { cartItems, setCartItems, onAdd, onMinus } = props;
    const totalPrice = cartItems.reduce(
        (acc, prod) => prod.quantity * prod.price + acc,
        0
    );
    const totalQty = cartItems.reduce((acc, prod) => prod.quantity + acc, 0);

    useEffect(() => {
        const check = localStorage.getItem("cartItems");
        if (check) {
            setCartItems(JSON.parse(check));
        }
    }, [setCartItems]);

    useEffect(() => {
        if (cartItems.length === 0) {
            localStorage.removeItem("cartItems");
        } else {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

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
                    <p className={styles.total}>{`Total: € ${totalPrice}`}</p>
                </div>
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Qty</p>
                        <p className={styles.heading}>Product-Id</p>
                        <p className={styles.heading}>Subtotal</p>
                    </div>
                    {cartItems.map((item) => {
                        const plusBtnClasses = !item.clickAllowed
                            ? styles.qty_plus_prevent
                            : styles.qty_plus;

                        const subtotal = item.price * item.quantity;
                        return (
                            <div key={item.id} className={styles.list_item}>
                                <div className={styles.qty_container}>
                                    <FiPlusCircle
                                        onClick={(e) =>
                                            !item.clickAllowed
                                                ? e.preventDefault()
                                                : onAdd(item)
                                        }
                                        className={plusBtnClasses}
                                    />
                                    <p className={styles.qty_value}>
                                        {item.quantity}
                                    </p>
                                    <FiMinusCircle
                                        onClick={() => onMinus(item)}
                                        className={styles.qty_minus}
                                    />
                                </div>
                                <p className={styles.product_name}>
                                    {item.metadata.p3d_id}
                                </p>
                                <p className={styles.sum}>€ {subtotal}</p>
                            </div>
                        );
                    })}
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
