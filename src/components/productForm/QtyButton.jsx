import React, { useContext, useEffect, useState } from "react";
import * as styles from "../../scss/qtyButton.module.scss";
import { BiTrash } from "react-icons/bi";
import { ProjectContext } from "../../lib/ProjectContext";
import { saveToLocal } from "../../lib";

const MIN = 1;

function QtyButton(props) {
    const { product, src } = props;

    const [value, setValue] = useState();
    const [showIcon, setShowIcon] = useState();

    const checkIcon = (qty) => {
        return qty === 1;
    };

    useEffect(() => {
        setValue(product.quantity);
        setShowIcon(checkIcon(product.quantity));
    }, [product]);

    const { setCartQty, setShowCheckout } = useContext(ProjectContext);

    const onAdd = (e) => {
        e.preventDefault();
        if (product.quantity + 1 <= product.maxQty) {
            product.quantity += 1;
            setValue((prev) => prev + 1);
            setCartQty((prev) => prev + 1);
            setShowIcon(checkIcon(product.quantity));
            setShowCheckout(true);
            saveToLocal(product.product_id, product);
        }
    };

    const onMinus = (e) => {
        e.preventDefault();
        if (product.quantity - 1 >= MIN) {
            product.quantity -= 1;
            setValue((prev) => prev - 1);
            setCartQty((prev) => prev - 1);
            setShowIcon(checkIcon(product.quantity));
            saveToLocal(product.product_id, product);
        }
    };

    const onDelete = (e) => {
        e.preventDefault();
        if (product.quantity - 1 === 0) {
            setValue(0);
            product.quantity = 0;
            setCartQty((prev) => prev - 1);
            setShowIcon(checkIcon(product.quantity));
            setShowCheckout(false);
            saveToLocal(product.product_id, product);
        }
    };

    return (
        <div className={styles.qty_selection}>
            {src === "project" && <p>In Cart:</p>}
            <div className={styles.container}>
                {showIcon ? (
                    <button
                        onClick={onDelete}
                        className={styles.mod_btn_container}
                    >
                        <BiTrash className={styles.mod_btn_icon} />
                    </button>
                ) : (
                    <button onClick={onMinus} className={styles.mod_btn}>
                        -
                    </button>
                )}
                <input
                    id="quantity"
                    html_for="quantity"
                    type="number"
                    className={styles.qty}
                    name="quantity"
                    min={MIN}
                    max={product.maxQty}
                    value={value}
                    onChange={() => console.log("doing fuck all")}
                ></input>
                <button onClick={onAdd} className={styles.mod_btn}>
                    +
                </button>
            </div>
        </div>
    );
}

export default QtyButton;
