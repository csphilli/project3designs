import React, { useEffect, useState } from "react";
import * as styles from "../scss/productModal.module.scss";
import { formattedPrice, getTooltipText, onAdd } from "../lib";

function ProductModal(props) {
    const { product, toggleModal } = props;

    const [selection, setSelection] = useState(product.product_list[0]);
    const [maxQty, setMaxQty] = useState(
        selection.inventory < selection.max_qty
            ? selection.inventory
            : selection.max_qty
    );
    const [soldOut, setSoldOut] = useState(
        selection.inventory === 0 ? true : false
    );

    useEffect(() => {});
    // useEffect(() => {
    //     // const prod = product.product_list.find((obj) => selection === obj.id);
    //     // console.log(prod);

    //     // setPrice(prod.price);
    //     setSoldOut(
    //         selection.inventory === 0 ||
    //             selection.quantity === selection.inventory ||
    //             selection.quantity === selection.max_qty
    //             ? true
    //             : false
    //     );
    //     // console.log(`SoldOut: ${soldOut}`);
    // }, [selection, product]);

    // const handleMaxQty = () => {
    //     const max =
    //         selection.inventory < selection.max_qty
    //             ? selection.inventory
    //             : selection.max_qty;
    //     setMaxQty(max - selection.quantity);
    // };

    const handleProductChange = (e) => {
        e.preventDefault();
        setSelection(
            product.product_list.find(
                (item) => item.id === Number(e.target.value)
            )
        );
        // setSoldOut(
        //     selection.inventory === 0 || selection.can_purchase === 0
        //         ? true
        //         : false
        // );
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            id: Number(form.get("product_id")),
            quantity: Number(form.get("quantity")),
        };
        selection.quantity = data.quantity;
        selection.can_purchase -= data.quantity;
        // setSoldOut(
        //     selection.inventory === 0 || selection.can_purchase === 0
        //         ? true
        //         : false
        // );

        /* TODO
        2) Implement custom up/down arrows for quantity selector
        3) Implement custom down arrow inside selection box.
        5) Add cart icon on modal when there's a product in the cart.

        */
    };

    console.log(`Rendered`);

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

                    <form
                        className={styles.modal_form}
                        onSubmit={handleProductSubmit}
                    >
                        <label className={styles.selector_title} htmlFor="size">
                            Size:
                        </label>
                        <select
                            className={styles.selector_menu}
                            name="product_id"
                            defaultValue={selection.size}
                            onChange={handleProductChange}
                        >
                            {product.product_list.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.size}
                                </option>
                            ))}
                        </select>

                        <label
                            className={styles.quantity_title}
                            htmlFor="quantity"
                        >
                            Quantity:
                        </label>
                        {soldOut ? (
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
                                    max={selection.can_purchase}
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
