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
        // handleClick,
        // onAdd,
        // onMinus,
        // formattedPrice,
        toggleModal,
        // btnClick,
    } = props;
    // const img = getImage(
    //     product.product_list[0].localFiles[0].childImageSharp.gatsbyImageData
    // );

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                toggleModal();
                document.activeElement.blur();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [toggleModal]);

    return (
        <aside className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modal_content}>
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
                </div>
            </div>
        </aside>
    );
}

export default ProductModal;
