import React from "react";
import QtyButton from "./QtyButton";
import * as styles from "../../scss/formElements/productForm.module.scss";

function NumberInput(props) {
    const { product } = props;
    return (
        <div className={styles.qty_selection}>
            <p>In Cart:</p>
            <QtyButton product={product} />
        </div>
    );
}

export default NumberInput;
