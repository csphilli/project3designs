import React from "react";
import * as styles from "../scss/productCard.module.scss";
import { BsCartPlus, BsFillInfoCircleFill } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductCard(props) {
    const { cartItems, product, onAdd, formattedPrice } = props;
    let btn = styles.btn_container;
    let clickAllowed = true;

    if (cartItems.length > 0) {
        const exist = cartItems.find((obj) => obj.id === product.id);
        if (exist && !exist.clickAllowed) {
            btn = `${styles.btn_container_prevent} ${styles.btn_prevent}`;
            clickAllowed = false;
        }
    }
    const img = getImage(product.localFiles[0].childImageSharp.gatsbyImageData);

    return (
        <div>
            <div className={styles.product_card}>
                <div>
                    <a
                        href={`/projects/${product.metadata.slug}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GatsbyImage image={img} alt="picture of product" />
                    </a>
                </div>
                <div>
                    <div className={styles.title_info_container}>
                        <h3 className={styles.title}>{product.name}</h3>
                        <div className={styles.purchase_info_outer_container}>
                            <div
                                className={styles.purchase_info_inner_container}
                            >
                                <BsFillInfoCircleFill />
                                <p className={styles.purchase_info_id}>
                                    product-id: {product.metadata.p3d_id}
                                </p>
                            </div>
                            <div
                                className={styles.purchase_info_inner_container}
                            >
                                <p>max qty: {product.metadata.max_qty}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pricing_text}>
                        <p className={styles.price}>
                            {formattedPrice(product.price)}
                        </p>
                        <button
                            onClick={(e) =>
                                !clickAllowed
                                    ? e.preventDefault()
                                    : onAdd(product)
                            }
                            className={btn}
                        >
                            <BsCartPlus
                                className={styles.btn_icon}
                                id={product.id}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
