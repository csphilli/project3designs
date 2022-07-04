import React from "react";
import QtyButton from "./QtyButton";
import * as styles from "../../scss/formElements/verticalForm.module.scss";

function NumberInput(props) {
    const { html_for, maxQty } = props;
    return (
        <div className={styles.qty_selection}>
            <label htmlFor={html_for}>Available: {maxQty}</label>
            <QtyButton max={maxQty} />
        </div>
    );
}

export default NumberInput;
