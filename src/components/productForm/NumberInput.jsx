import React from "react";
import QtyButton from "./QtyButton";
import * as styles from "../../scss/formElements/productForm.module.scss";

function NumberInput(props) {
    const { product, style } = props;
    return (
        <div className={styles.qty_selection}>
            {style === "project" ? <p>In Cart:</p> : null}
            <QtyButton product={product} />
        </div>
    );
}

export default NumberInput;
