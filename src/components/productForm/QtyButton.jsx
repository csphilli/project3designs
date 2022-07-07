import React, { useContext, useEffect, useState } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";
import { ProjectContext } from "../../lib/ProjectContext";

const MIN = 1;

function QtyButton(props) {
    const { product } = props;

    const { inputValue, setInputValue, onAdd, onMinus, onDelete } =
        useContext(ProjectContext);

    const [showDelete, setShowDelete] = useState(
        product.quantity === 1 ? true : false
    );

    const checkDelete = () => {
        setShowDelete(product.quantity === 1 ? true : false);
    };

    useEffect(() => {
        checkDelete();
    }, [checkDelete]);

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
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
                html_for="quantity"
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
