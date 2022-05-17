import React from "react";
import * as styles from "../scss/productCard.module.scss";
import { BsCartPlus, BsFillInfoCircleFill } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductCard(props) {
    const { data } = props;
    const img = getImage(data.localFiles[0].childImageSharp.gatsbyImageData);
    const price = data.price === 0 ? `FREE` : data.price;
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
                    <div className={styles.title_info_container}>
                        <h3 className={styles.title}>{data.name}</h3>
                        <div className={styles.product_id_container}>
                            <BsFillInfoCircleFill />
                            <p className={styles.product_id}>
                                product-id: {data.metadata.p3d_id}
                            </p>
                        </div>
                    </div>
                    <div className={styles.pricing_text}>
                        <p className={styles.price}>{`€ ${price}`}</p>
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
