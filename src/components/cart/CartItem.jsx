import React from "react";
import * as styles from "../../scss/cart/cartItem.module.scss";

function CartItem(props) {
    return (
        <div className={styles.form_container}>
            <div className={styles.product_section}>
                <img
                    className={styles.image}
                    src={selection.image_url}
                    alt="picture of product"
                />
                <div className={styles.product_text_container}>
                    <p className={styles.product_name}>{selection.name}</p>
                    <p className={styles.price}>
                        {formattedPrice(selection.price)}
                    </p>
                </div>
            </div>
            <p>{selection.size}</p>
            <NumberInput html_for="quantity" style="cart" product={selection} />
            <p>{formattedPrice(selection.quantity * selection.price)}</p>
        </div>
    );
}

export default CartItem;
