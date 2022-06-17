import React, { useEffect, useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import ProductModal from "./ProductModal";
import { formattedPrice } from "../lib";
import LoadingSpinner from "./LoadingSpinner";

/* TODO
1) Images coming from Stripe image_url meta aren't sizing all to the same size.
*/

function ProductCard(props) {
    const { product, orderItems, setOrderItems } = props;
    const [showModal, setShowModal] = useState(false);
    const [soldOut, setSoldOut] = useState(false);

    const toggleModal = () => {
        setShowModal((latest) => !latest);
        if (showModal) document.body.style.overflow = "unset";
        if (!showModal) document.body.style.overflow = "hidden";
    };

    useEffect(() => {
        if (
            product.product_list.length < 2 &&
            product.product_list[0].inventory === 0
        )
            setSoldOut(true);
    }, []);

    const { price, currency, name, image_url } = product.product_list[0];
    return (
        <>
            <div className={styles.product_card} onClick={() => toggleModal()}>
                <div className={styles.image_container}>
                    <img
                        className={styles.image}
                        src={image_url}
                        alt="picture of product"
                    />
                </div>
                <div className={styles.text_container}>
                    <div>
                        <h3 className={styles.title}>{name}</h3>
                        <p className={styles.price}>
                            {formattedPrice(price, currency)}
                        </p>
                    </div>
                    {soldOut && <p className={styles.sold_out}>Sold Out</p>}
                </div>
            </div>
            {showModal && (
                <ProductModal
                    product={product}
                    orderItems={orderItems}
                    setOrderItems={setOrderItems}
                    toggleModal={toggleModal}
                />
            )}
        </>
    );
}

export default ProductCard;
