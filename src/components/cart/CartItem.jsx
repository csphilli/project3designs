import React from "react";
import QtyButton from "../productForm/QtyButton";
import * as styles from "../../scss/cart/cartItem.module.scss";
import { formattedPrice } from "../../lib";
import { Link } from "gatsby";

function CartItem(props) {
    const { product, src, value, setValue } = props;

    return (
        <div className={styles.item_container}>
            <div className={styles.product_section}>
                <Link
                    to={`/projects/${product.slug}`}
                    aria-label={`link to ${product.slug}`}
                >
                    <img
                        className={styles.image}
                        src={product.image_url}
                        alt="Here is what the product looks like"
                    />
                </Link>
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
                <QtyButton
                    product={product}
                    src={src}
                    value={value}
                    setValue={setValue}
                />
            </div>
            <div className={styles.subheading_container}>
                <p className={styles.desc}>Total:</p>
                <p>{formattedPrice(product.quantity * product.price)}</p>
            </div>
        </div>
    );
}

export default CartItem;
