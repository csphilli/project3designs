import React from "react";
import QtyButton from "./QtyButton";
import * as styles from "../../scss/formElements/productForm.module.scss";

function NumberInput(props) {
    const { html_for, product } = props;
    return (
        <div className={styles.qty_selection}>
            <label htmlFor={html_for}>Available: {product.maxQty}</label>
            <QtyButton product={product} />
        </div>
    );
}

export default NumberInput;
