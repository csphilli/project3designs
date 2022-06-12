import React, { useEffect, useState } from "react";
import * as styles from "../scss/productModal.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AddToCartBtn from "./AddToCartBtn";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import { formattedPrice } from "../lib";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function ProductModal(props) {
    const { product, toggleModal } = props;
    const [selection, setSelection] = useState(product.product_list[0].id);
    const [maxQty, setMaxQty] = useState(product.product_list[0].max_qty);
    const [price, setPrice] = useState(product.product_list[0].price);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            id: form.get("product_id"),
            quantity: form.get("quantity"),
        };
        console.log(data);

        /* TODO
        1) Form data should be sent to useContext provider area 
        */

        // console.log("selection", selection);
        // console.log("quantity");

        // const formData = new FormData(e.currentTarget);
        // console.log(formData);
    };

    useEffect(() => {
        const prod = product.product_list.find((obj) => selection === obj.id);
        setMaxQty(prod.max_qty);
        setPrice(prod.price);
    }, [selection]);

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
                    <img
                        src={product.product_list[0].image_url}
                        alt="pic of product"
                    />
                </div>
                <div className={styles.text_container}>
                    <h3 className={styles.product_name}>
                        {product.product_list[0].name}
                    </h3>
                    <p className={styles.price}>{formattedPrice(price)}</p>
                    <p className={styles.description}>
                        {product.product_list[0].desc}
                    </p>

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
                            value={selection}
                            onChange={(e) => {
                                setSelection(Number(e.target.value));
                            }}
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
                        <input
                            type="number"
                            className={styles.quantity_selector}
                            name="quantity"
                            min="1"
                            max={maxQty}
                            defaultValue="1"
                        ></input>
                        <button className={styles.submit_button} type="submit">
                            Add to Cart
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductModal;
