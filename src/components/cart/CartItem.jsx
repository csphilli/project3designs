import React from "react";
import QtyButton from "../productForm/QtyButton";
import * as styles from "../../scss/cart/cartItem.module.scss";

function CartItem(props) {
    const { product } = props;
    return (
        // <div>CartItem</div>
        <div className={styles.form_container}>
            <div className={styles.product_section}>
                {/* <img
                    className={styles.image}
                    src={selection.image_url}
                    alt="picture of product"
                /> */}
                <div className={styles.product_text_container}>
                    <p className={styles.product_name}>name</p>
                    <p className={styles.price}>
                        price
                        {/* {formattedPrice(selection.price)} */}
                    </p>
                </div>
            </div>
            <p>size</p>
            {/* <QtyButton product={product} src="cart" /> */}
            <p>total</p>
        </div>
    );
}

export default CartItem;
