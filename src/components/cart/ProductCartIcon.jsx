import React from "react";
import { Link } from "gatsby";
import { BsCart } from "react-icons/bs";
import * as styles from "../../scss/cart/productCartIcon.module.scss";

function ProductCartIcon(props) {
    const { qty } = props;
    return (
        <Link
            onClick={() => {
                document.body.style.overflow = "unset";
            }}
            to="/cart"
            data-qty={qty}
            className={styles.link_container}
        >
            <BsCart className={styles.cart_icon} />
        </Link>
    );
}

export default ProductCartIcon;

/*
{selection.quantity > 0 && (
                    <Link
                        onClick={() => {
                            document.body.style.overflow = "unset";
                        }}
                        to="/cart"
                        data-qty={selection.quantity}
                        className={styles.link_container}
                    >
                        <BsCart className={styles.cart_icon} />
                    </Link>
                )}
                */
