import React, { useEffect, useState } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";
import { saveToLocal } from "../../lib";

const MIN = 1;

function QtyButton(props) {
    const { product } = props;
    const [inputValue, setInputValue] = useState(product.quantity);
    const [showDelete, setShowDelete] = useState(
        product.quantity === 1 ? true : false
    );

    const checkDelete = () => {
        setShowDelete(product.quantity === 1 ? true : false);
    };

    useEffect(() => {
        checkDelete();
    }, [inputValue]);

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
    };

    const onAdd = (e) => {
        e.preventDefault();
        if (product.quantity + 1 <= product.maxQty) {
            product.quantity += 1;
            setInputValue((prev) => prev + 1);
        }
        saveToLocal(product.product_id, product);
    };

    const onMinus = (e) => {
        e.preventDefault();
        if (product.quantity - 1 >= MIN) {
            product.quantity -= 1;
            setInputValue((prev) => prev - 1);
        }
        saveToLocal(product.product_id, product);
    };

    const onDelete = (e) => {
        e.preventDefault();
        product.quantity = 0;
        setInputValue(0);
        saveToLocal(product.product_id, product);
    };

    return (
        <div className={styles.container}>
            {showDelete ? (
                <button onClick={onDelete} className={styles.mod_btn_container}>
                    <BiTrash className={styles.mod_btn_icon} />
                </button>
            ) : (
                <button onClick={onMinus} className={styles.mod_btn}>
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
                value={inputValue}
                onChange={onChangeHandler}
            ></input>
            <button onClick={onAdd} className={styles.mod_btn}>
                +
            </button>
        </div>
    );
}

export default QtyButton;
