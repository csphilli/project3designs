import React, { useEffect, useState } from "react";
import * as styles from "../scss/addToCartBtn.module.scss";

function AddToCartBtn(props) {
    const { product, children, onAdd, handleClick, btnClick, src } = props;
    const [clickAllowed, setClickAllowed] = useState(true);

    useEffect(() => {
        if (
            product.inventory < 1 ||
            product.quantity >= product.metadata.max_qty
        ) {
            setClickAllowed(false);
        } else {
            setClickAllowed(true);
        }
    }, [btnClick]);

    const getTooltipText = (product) => {
        if (product.inventory < 1) {
            return "Sold Out";
        } else if (product.quantity >= product.metadata.max_qty) {
            return "Max Quantity";
        }
        return "Incorrect Tooltip";
    };

    let btnStyle;

    if (src === "card") {
        btnStyle = clickAllowed
            ? styles.card_btn_container
            : `${styles.card_btn_container_prevent} ${styles.card_btn_prevent}`;
    } else if (src === "cart" || src === "modal") {
        btnStyle = clickAllowed
            ? `${styles.cart_button} ${styles.cart_qty_plus}`
            : `${styles.cart_button_prevent} ${styles.cart_qty_plus_prevent}`;
    }

    return (
        <button
            // data-tooltip={getTooltipText}
            className={btnStyle}
            onClick={(e) => {
                if (!clickAllowed) {
                    e.preventDefault();
                } else {
                    onAdd(product);
                    handleClick();
                }
            }}
        >
            {children}
        </button>
    );
}

export default AddToCartBtn;
