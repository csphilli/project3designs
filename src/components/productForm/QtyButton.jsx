import React, { useContext } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";
import { CartContext } from "../providers/CartProvider";

function QtyButton(props) {
    const { product, src, value, setValue } = props;
    const { onAdd, onMinus } = useContext(CartContext);

    const handleAdd = (e) => {
        e.preventDefault();
        if (value + 1 <= product.sale_limit) {
            onAdd(product);
            setValue((prev) => prev + 1);
        }
    };

    const handleMinus = (e) => {
        e.preventDefault();
        if (value - 1 >= 0) {
            onMinus(product);
            setValue((prev) => prev - 1);
        }
    };

    return (
        <div className={styles.qty_selection}>
            {src === "project" && <p>In Cart:</p>}
            <div className={styles.container}>
                {value === 1 ? (
                    <button
                        onClick={handleMinus}
                        className={styles.mod_btn_container}
                        aria-label="Delete product"
                    >
                        <BiTrash className={styles.mod_btn_icon} />
                    </button>
                ) : (
                    <button
                        onClick={handleMinus}
                        className={styles.mod_btn}
                        aria-label="Reduce Quantity"
                    >
                        -
                    </button>
                )}
                <input
                    id="quantity"
                    html_for="quantity"
                    type="number"
                    name="quantity"
                    min={1}
                    max={product.sale_limit}
                    value={value}
                    readOnly
                ></input>
                <button
                    onClick={handleAdd}
                    className={styles.mod_btn}
                    aria-label="Increase Quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QtyButton;
