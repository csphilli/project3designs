import React, { useEffect, useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import { BsCartPlus, BsFillInfoCircleFill } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductCard(props) {
    const { product, onAdd } = props;

    const img = getImage(product.localFiles[0].childImageSharp.gatsbyImageData);
    const price = product.price === 0 ? `FREE` : product.price;
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
                        <div className={styles.product_id_container}>
                            <BsFillInfoCircleFill />
                            <p className={styles.product_id}>
                                product-id: {product.metadata.p3d_id}
                            </p>
                        </div>
                    </div>
                    <div className={styles.pricing_text}>
                        <p className={styles.price}>{`€ ${price}`}</p>
                        <button
                            onClick={() => {
                                onAdd(product);
                            }}
                            // className={btn_style}
                            className={styles.btn_container}
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
