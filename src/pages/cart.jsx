import React, { useContext, useEffect, useState } from "react";
import Seo from "../components/Seo";
import { loadLocal, formattedPrice } from "../lib";
import * as styles from "../scss/cart/shoppingCart.module.scss";
import CartItem from "../components/cart/CartItem";
import { ProjectContext } from "../lib/ProjectContext";
function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { cartQty } = useContext(ProjectContext);

    useEffect(() => {
        setCartItems(loadLocal());
    }, [cartQty]);

    if (cartItems && cartItems.length < 1) {
        return (
            <section className={styles.empty_cart_container}>
                <h2 className={styles.title}>Your cart is empty</h2>
            </section>
        );
    } else if (cartItems)
        return (
            <div className={styles.cart_container}>
                <Seo title="Cart" />
                <form name="shoppingList" className={styles.cart_form}>
                    <div className={styles.btn_container}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                console.log("Pressed Checkout");
                            }}
                            className={styles.form_btn}
                        >
                            Checkout
                        </button>
                    </div>
                    <div className={styles.heading_container}>
                        <h2 className={styles.title}>Your Selections:</h2>
                        <fieldset>
                            <h3>Product</h3>
                            <h3>Description</h3>
                            <h3>Quantity</h3>
                            <h3>Total Price</h3>
                        </fieldset>
                    </div>
                    <div className={styles.items_container}>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.product_id}
                                product={item}
                                src="cart"
                            />
                        ))}
                    </div>
                </form>
                <div className={styles.total_section}>
                    <div className={styles.value}>
                        <h3 className={`${styles.light_tint} ${styles.desc}`}>
                            Tax:
                        </h3>
                        <p className={styles.light_tint}>Included</p>
                    </div>
                    <div className={styles.value}>
                        <h3 className={`${styles.light_tint} ${styles.desc}`}>
                            Shipping:
                        </h3>
                        <p className={styles.light_tint}>At Checkout</p>
                    </div>
                    <div className={styles.value}>
                        <h3 className={styles.desc}>Subtotal:</h3>
                        <p>
                            {formattedPrice(
                                cartItems.reduce(
                                    (total, item) =>
                                        total + item.quantity * item.price,
                                    0
                                )
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    else return null;
}

export default Cart;
