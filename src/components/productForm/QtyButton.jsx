import React, { useEffect, useState } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";
import { saveToLocal } from "../../lib";

const MIN = 1;

function QtyButton(props) {
    const { product, setShowCartIcon } = props;
    const [showDelete, setShowDelete] = useState(
        product.quantity === 1 ? true : false
    );

    const checkDelete = () => {
        setShowDelete(product.quantity === 1 ? true : false);
    };

    useEffect(() => {
        checkDelete();
    }, [props.inputValue]);

    const onChangeHandler = (event) => {
        props.setInputValue(event.target.value);
    };

    return (
        <div className={styles.container}>
            {showDelete ? (
                <button
                    onClick={props.onDelete}
                    className={styles.mod_btn_container}
                >
                    <BiTrash className={styles.mod_btn_icon} />
                </button>
            ) : (
                <button onClick={props.onMinus} className={styles.mod_btn}>
                    -
                </button>
            )}
            <input
                id="qty_selector"
                type="number"
                className={styles.qty}
                name="quantity"
                min={MIN}
                max={product.maxQty}
                value={props.inputValue}
                onChange={onChangeHandler}
            ></input>
            <button onClick={props.onAdd} className={styles.mod_btn}>
                +
            </button>
        </div>
    );
}

export default QtyButton;
