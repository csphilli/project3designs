import React, { useEffect, useState } from "react";
import * as styles from "../scss/removeFromCartBtn.module.scss";

function RemoveFromCartBtn(props) {
    const { product, children, onMinus, handleClick, btnClick } = props;
    const [clickAllowed, setClickAllowed] = useState(false);

    useEffect(() => {
        product.quantity > 0 ? setClickAllowed(true) : setClickAllowed(false);
    }, [btnClick]);

    const btnStyle = clickAllowed
        ? `${styles.cart_button} ${styles.cart_qty_minus}`
        : `${styles.cart_button_prevent} ${styles.cart_qty_minus_prevent}`;

    return (
        <button
            onClick={(e) => {
                onMinus(product);
                handleClick();
            }}
            className={btnStyle}
        >
            {children}
        </button>
    );
}
export default RemoveFromCartBtn;
