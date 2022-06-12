import React, { useEffect, useState } from "react";
import * as styles from "../scss/productModal.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AddToCartBtn from "./AddToCartBtn";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import { formattedPrice } from "../lib";

function ProductModal(props) {
    const { product, toggleModal } = props;
    const [maxQty, setMaxQty] = useState(0);

    const handleProductSubmit = () => {
        console.log("product submitted");
    };

    const handleChange = (e) => {
        const prod = product.product_list.find(
            (obj) => obj.id === Number(e.target.value)
        );
        setMaxQty(prod.max_qty);
        console.log(maxQty);
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
                    <p className={styles.description}>
                        {product.product_list[0].desc}
                    </p>
                    <form onSubmit={handleProductSubmit}>
                        <label htmlFor="size">Size:</label>
                        <select
                            value="select"
                            id="test"
                            onChange={handleChange}
                        >
                            <option value="select">Select</option>
                            {product.product_list.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.size}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max={maxQty}
                        ></input>
                    </form>
                    <button
                        className={styles.modal_close_btn}
                        onClick={() => toggleModal()}
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductModal;
