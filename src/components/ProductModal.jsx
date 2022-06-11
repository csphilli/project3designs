import React, { useEffect } from "react";
import * as styles from "../scss/productModal.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AddToCartBtn from "./AddToCartBtn";
import RemoveFromCartBtn from "./RemoveFromCartBtn";
import { formattedPrice } from "../lib";

function ProductModal(props) {
    const {
        product,
        // toggleModal,
        // showModal,
        // handleClick,
        // onAdd,
        // onMinus,
        // formattedPrice,
        setShowModal,
        // btnClick,
    } = props;
    // const img = getImage(
    //     product.product_list[0].localFiles[0].childImageSharp.gatsbyImageData
    // );

    const handleProductSubmit = () => {
        console.log("product submitted");
    };

    return (
        // <>
        <div
            className={styles.modal_backdrop}
            onClick={() => setShowModal(false)}
        >
            {/* <div className={styles.modal_backdrop}></div> */}
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
                        <select name="size" id="size">
                            <option value="select">Select</option>
                            {product.product_list.map((item) => {
                                <option value={item.size}>{item.size}</option>;
                            })}
                        </select>
                    </form>
                </div>
            </div>
        </div>
        // </>
    );
}

export default ProductModal;
