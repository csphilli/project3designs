import React from "react";
import * as styles from "../scss/productCard.module.scss";
import { BsCartPlus } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductCard(props) {
    const { data } = props;
    const img = getImage(data.localFiles[0].childImageSharp.gatsbyImageData);
    console.log(img);
    return (
        <div>
            <div className={styles.product_card}>
                <div>
                    <a
                        href={`/projects/${data.metadata.slug}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GatsbyImage image={img} alt="picture of product" />
                    </a>
                </div>
                <div>
                    <h3 className={styles.title}>{data.name}</h3>
                    <div className={styles.pricing_text}>
                        <p className={styles.price}>{`€ ${data.price}`}</p>
                        <button className={styles.btn_container}>
                            <BsCartPlus
                                className={styles.btn_icon}
                                id={data.id}
                            />
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default ProductCard;
