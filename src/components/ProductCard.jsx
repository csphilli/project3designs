import React, { useEffect, useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import { formattedPrice } from "../lib";

function ProductCard(props) {
    const { product } = props;
    const [soldOut, setSoldOut] = useState(false);
    useEffect(() => {
        if (
            product.product_list.length < 2 &&
            product.product_list[0].inventory === 0
        )
            setSoldOut(true);
    }, []);

    const { price, currency, name, image_url } = product.product_list[0];

    return (
        <div className={styles.product_card}>
            <div className={styles.image_container}>
                <img
                    className={styles.image}
                    src={image_url}
                    alt="picture of product"
                />
                {/* <GatsbyImage
                    image={getImage(image_url)}
                    alt="Product"
                    className={styles.image}
                /> */}
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
    );
}

export default ProductCard;
