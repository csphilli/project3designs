import React from "react";
import * as styles from "../scss/productCard.module.scss";
import { Link } from "gatsby";

function ProductCard(props) {
    const { data } = props;
    console.log(data);
    const test = "20";
    return (
        <div>
            <div className={styles.product_card}>
                <div className={styles.img_container}>
                    <a
                        href="https://via.placeholder.com/150/92c952"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            className={styles.product_img}
                            src="https://via.placeholder.com/150/92c952"
                            alt="testing"
                        />
                    </a>
                </div>
                <h3 className={styles.title}>{data.title}</h3>
                <div className={styles.deets_container}>
                    <div className={styles.pricing_text}>
                        <h4 className={styles.subtitle}>Plans</h4>
                        <p className={styles.price}>{`€${test}`}</p>
                    </div>
                    <div className={styles.button_container}>
                        <button className={styles.cart_button}>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className={styles.deets_container}>
                    <div className={styles.pricing_text}>
                        <h4 className={styles.subtitle}>Course</h4>
                        <p className={styles.price}>{`€${test}`}</p>
                    </div>
                    <button className={styles.cart_button}>See Course</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
