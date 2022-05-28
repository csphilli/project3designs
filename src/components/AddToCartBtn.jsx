import React, { useEffect, useState } from "react";
import * as styles from "../scss/addToCartBtn.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";

const TOOLTIPS = {
    MAX_QTY: "Max Quantity",
    SOLD_OUT: "Sold Out",
};

function AddToCartBtn(props) {
    const { product, children, onAdd, handleClick, btnClick, src } = props;
    const [clickAllowed, setClickAllowed] = useState(true);

    useEffect(() => {
        switch (product.metadata.product_type) {
            case "physical": {
                if (
                    product.inventory < 1 ||
                    product.quantity === product.inventory ||
                    product.quantity >= product.metadata.max_qty
                )
                    setClickAllowed(false);
                else setClickAllowed(true);
                break;
            }
            case "plan": {
                if (product.quantity >= product.metadata.max_qty)
                    setClickAllowed(false);
                else setClickAllowed(true);
                break;
            }
            default: {
                setClickAllowed(true);
                break;
            }
        }
    }, [btnClick]);

    const getTooltipText = (prod) => {
        switch (prod.metadata.product_type) {
            case "physical": {
                if (prod.inventory < 1 || prod.quantity === prod.inventory)
                    return TOOLTIPS.SOLD_OUT;
                else if (prod.quantity >= prod.metadata.max_qty)
                    return TOOLTIPS.MAX_QTY;
                break;
            }
            case "plan": {
                if (prod.quantity >= prod.metadata.max_qty)
                    return TOOLTIPS.MAX_QTY;
                break;
            }
            default: {
                return "Invalid Tooltip";
            }
        }
    };

    let btnStyle;

    if (src === "card") {
        btnStyle = clickAllowed
            ? styles.card_btn_container
            : `${styles.card_btn_container_prevent} ${styles.card_btn_prevent} ${tooltip.tooltip}`;
    } else if (src === "cart" || src === "modal") {
        btnStyle = clickAllowed
            ? `${styles.cart_button} ${styles.cart_qty_plus}`
            : `${styles.cart_button_prevent} ${styles.cart_qty_plus_prevent} ${tooltip.tooltip}`;
    }

    return (
        <button
            data-tooltip={`${getTooltipText(product)}`}
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
