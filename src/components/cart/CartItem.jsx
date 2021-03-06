import React from "react";
import QtyButton from "../productForm/QtyButton";
import * as styles from "../../scss/cart/cartItem.module.scss";
import { formattedPrice } from "../../lib";

function CartItem(props) {
    const { product, src } = props;

    return (
        <div className={styles.item_container}>
            <div className={styles.product_section}>
                <img
                    className={styles.image}
                    src={product.image_url}
                    alt="Here is what the product looks like"
                />
                <div className={styles.product_text_container}>
                    <p className={styles.product_name}>{product.name}</p>
                    <p>{formattedPrice(product.price)}</p>
                </div>
            </div>
            <div className={styles.subheading_container}>
                <p className={styles.desc}>Desc:</p>
                <p>{product.size}</p>
            </div>
            <div className={styles.subheading_container}>
                <p className={styles.desc}>Qty:</p>
                <QtyButton product={product} src={src} />
            </div>
            <div className={styles.subheading_container}>
                <p className={styles.desc}>Total:</p>
                <p>{formattedPrice(product.quantity * product.price)}</p>
            </div>
        </div>
    );
}

export default CartItem;
