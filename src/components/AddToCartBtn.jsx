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
        switch (product.tax_code_name) {
            case "General - Tangible Goods": {
                if (
                    product.inventory < 1 ||
                    product.quantity === product.inventory ||
                    product.quantity >= product.max_qty
                )
                    setClickAllowed(false);
                else setClickAllowed(true);
                break;
            }
            case "e-book": {
                if (product.quantity >= product.max_qty) setClickAllowed(false);
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
        switch (prod.tax_code_name) {
            case "General - Tangible Goods": {
                if (prod.inventory < 1 || prod.quantity === prod.inventory)
                    return TOOLTIPS.SOLD_OUT;
                else if (prod.quantity >= prod.max_qty) return TOOLTIPS.MAX_QTY;
                break;
            }
            case "e-book": {
                if (prod.quantity >= prod.max_qty) return TOOLTIPS.MAX_QTY;
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
