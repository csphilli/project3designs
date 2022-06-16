import React, { useEffect, useState } from "react";
import * as styles from "../scss/productModal.module.scss";
import { formattedPrice, getTooltipText } from "../lib";
/* TODO
        2) Implement custom up/down arrows for quantity selector
        3) Implement custom down arrow inside selection box.
        5) Add cart icon on modal when there's a product in the cart.
        6) Instead of cart button completely disappearing, updated it with a not allowed cursor instead.
        7) Instead of keeping track of maxQty according to selection.quantity, the form functionality should add to an order Item instead of product.quantity

*/
function ProductModal(props) {
    const { product, toggleModal, orderItems, setOrderItems } = props;
    const [selection, setSelection] = useState(product.product_list[0]);
    const [maxQty, setMaxQty] = useState(() => {
        const max =
            selection.inventory < selection.max_qty
                ? selection.inventory
                : selection.max_qty;
        return max - selection.quantity;
    });

    useEffect(() => {
        setMaxQty(() => {
            const max =
                selection.inventory < selection.max_qty
                    ? selection.inventory
                    : selection.max_qty;
            return max - selection.quantity;
        });
    }, [selection]);

    const handleAdd = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            product_id: form.get("product_id"),
            quantity: Number(form.get("quantity")),
        };
        selection.quantity += data.quantity;
        setMaxQty((prevState) => prevState - data.quantity);
    };

    const handleChange = (e) => {
        setSelection(
            product.product_list.find(
                (item) => item.product_id === e.target.value
            )
        );
    };

    return (
        <>
            <div
                className={styles.modal_backdrop}
                onClick={() => {
                    toggleModal();
                }}
            />
            <div className={styles.modal}>
                <button
                    className={styles.modal_close_btn}
                    onClick={() => toggleModal()}
                >
                    X
                </button>
                <div className={styles.image_container}>
                    <img src={selection.image_url} alt="pic of product" />
                </div>
                <div className={styles.text_container}>
                    <h3 className={styles.product_name}>{selection.name}</h3>
                    <p className={styles.price}>
                        {formattedPrice(selection.price)}
                    </p>
                    <p className={styles.description}>{selection.desc}</p>

                    <form className={styles.modal_form} onSubmit={handleAdd}>
                        <label className={styles.selector_title} htmlFor="size">
                            Size:
                        </label>
                        <select
                            className={styles.selector_menu}
                            name="product_id"
                            defaultValue={selection.size}
                            onChange={handleChange}
                        >
                            {product.product_list.map((item) => (
                                <option key={item.id} value={item.product_id}>
                                    {item.size}
                                </option>
                            ))}
                        </select>

                        <label
                            className={styles.quantity_title}
                            htmlFor="quantity"
                        >
                            Available: {maxQty}
                        </label>
                        {maxQty === 0 ? (
                            <p className={styles.sold_out}>
                                {getTooltipText(
                                    product.product_list.find(
                                        (item) => item.id === selection.id
                                    )
                                )}
                            </p>
                        ) : (
                            <div className={styles.add_to_cart_container}>
                                <input
                                    type="number"
                                    className={styles.quantity_selector}
                                    name="quantity"
                                    min="1"
                                    max={maxQty}
                                    defaultValue="1"
                                ></input>
                                <button
                                    className={styles.submit_button}
                                    type="submit"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductModal;
