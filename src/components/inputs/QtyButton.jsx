import React, { useState } from "react";
import * as styles from "../../scss/QtyButton.module.scss";

function QtyButton(props) {
    const { max } = props;
    const [inputValue, setInputValue] = useState(1);

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
    };

    const addQty = (e) => {
        e.preventDefault();
        setInputValue((prevValue) => {
            if (prevValue + 1 <= max) {
                return prevValue + 1;
            }
            return prevValue;
        });
    };

    const minusQty = (e) => {
        e.preventDefault();
        setInputValue((prevValue) => {
            if (prevValue - 1 >= 1) {
                return prevValue - 1;
            }
            return prevValue;
        });
    };

    return (
        <div className={styles.container}>
            <button onClick={minusQty} className={styles.mod_btn}>
                -
            </button>
            <input
                id="qty_selector"
                type="number"
                className={styles.qty}
                name="quantity"
                min="1"
                max={max}
                value={inputValue}
                onChange={onChangeHandler}
            ></input>
            <button onClick={addQty} className={styles.mod_btn}>
                +
            </button>
        </div>
    );
}

export default QtyButton;
