import React, { useEffect, useState } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";

const MIN = 1;

function QtyButton(props) {
    const { max } = props;

    const [inputValue, setInputValue] = useState(() => (max === 0 ? 0 : 1));

    useEffect(() => {
        setInputValue(max === 0 ? 0 : 1);
    }, [max]);

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
            if (prevValue - 1 >= MIN) {
                return prevValue - 1;
            }
            return prevValue;
        });
    };

    /*

    <div className={styles.mod_btn_container}>
                    <BiTrash className={styles.mod_btn_icon} />
                </div>

                */

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
                min={MIN}
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
