import React from "react";
import { Link } from "gatsby";
import { BsCart } from "react-icons/bs";
import * as styles from "../../scss/cart/productCartIcon.module.scss";

function ProductCartIcon(props) {
    const { qty } = props;
    return (
        <Link to="/cart" className={styles.link_container}>
            <BsCart className={styles.cart_icon} />
            <div className={styles.qty_value}>{qty}</div>
        </Link>
    );
}

export default ProductCartIcon;
