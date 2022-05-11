import React from "react";
import * as styles from "../scss/productCard.module.scss";
import { Link } from "gatsby";
// import { GatsbyImage, getImage } from "gatsby";

function ProductCard(props) {
    const { data } = props;
    const test = "20";
    return (
        <div>
            <div className={styles.product_card}>
                <h3 className={styles.title}>{data.title}</h3>
                <div className={styles.card_details}>
                    <div className={styles.img_container}>
                        <Link
                            to="https://via.placeholder.com/150/92c952"
                            target="_blank"
                        >
                            <img
                                className={styles.product_img}
                                src="https://via.placeholder.com/150/92c952"
                                alt="testing"
                            />
                        </Link>
                    </div>
                    <div className={styles.plan_container}>
                        <div className={styles.pricing_text}>
                            <h4 className={styles.subtitle}>Plans</h4>
                            <p className={styles.price}>{`€${test}`}</p>
                        </div>
                        <button className={styles.cart_button}>
                            Add to Cart
                        </button>
                    </div>
                    <div className={styles.course_container}>
                        <div className={styles.pricing_text}>
                            <h4 className={styles.subtitle}>Course</h4>
                            <p className={styles.price}>{`€${test}`}</p>
                        </div>
                        <button className={styles.cart_button}>
                            See Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
