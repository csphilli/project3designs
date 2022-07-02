import React from "react";
import QtyButton from "./QtyButton";

function NumberInput(props) {
    const { html_for, maxQty } = props;
    return (
        <div>
            <label htmlFor={html_for}>Available: {maxQty}</label>
            <QtyButton max={maxQty} />
        </div>
    );
}

export default NumberInput;
