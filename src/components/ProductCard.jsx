import React, { useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";
import { BsCartPlus, BsFillInfoCircleFill, BsThreeDots } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ProductModal from "./ProductModal";
import AddToCartBtn from "./AddToCartBtn";

function ProductCard(props) {
    const { product, handleClick, btnClick, onAdd, onMinus, formattedPrice } =
        props;
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        if (showModal) document.body.style.overflow = "unset";
        if (!showModal) document.body.style.overflow = "hidden";
    };

    if (product.product_list.length > 1) {
        const { name } = product.product_list[0];
        const { slug } = product.product_list[0].metadata;
        const img = getImage(
            product.product_list[0].localFiles[0].childImageSharp
                .gatsbyImageData
        );

        // return html with modal
        return (
            <div>
                <div className={styles.product_card}>
                    <div>
                        <a
                            href={`/projects/${slug}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GatsbyImage
                                className={styles.image_container}
                                image={img}
                                alt="picture of the product"
                            />
                        </a>
                    </div>
                    <div>
                        <div>
                            <h3 className={styles.title}>{name}</h3>
                            <div
                                className={styles.purchase_info_outer_container}
                            >
                                <div
                                    className={
                                        styles.purchase_info_inner_container
                                    }
                                >
                                    <BsFillInfoCircleFill />
                                    <p className={styles.purchase_info_id}>
                                        product-id: multiple
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.pricing_text}>
                            <p className={styles.price}>€</p>
                            <button
                                className={styles.btn_container}
                                onClick={toggleModal}
                            >
                                <BsThreeDots />
                            </button>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <ProductModal
                        toggleModal={toggleModal}
                        product={product}
                        btnClick={btnClick}
                        handleClick={handleClick}
                        onAdd={onAdd}
                        onMinus={onMinus}
                        formattedPrice={formattedPrice}
                    />
                ) : null}
            </div>
        );
    } else {
        const { price, currency, name, description } = product.product_list[0];
        const { slug } = product.product_list[0].metadata;
        const img = getImage(
            product.product_list[0].localFiles[0].childImageSharp
                .gatsbyImageData
        );
        return (
            <div>
                <div className={styles.product_card}>
                    <div>
                        <a
                            href={`/projects/${slug}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GatsbyImage
                                image={img}
                                className={styles.image_container}
                                alt="picture of product"
                            />
                        </a>
                    </div>
                    <div>
                        <div>
                            <h3 className={styles.title}>{name}</h3>
                            <div
                                className={styles.purchase_info_outer_container}
                            >
                                <div
                                    className={
                                        styles.purchase_info_inner_container
                                    }
                                >
                                    <BsFillInfoCircleFill />
                                    <p className={styles.purchase_info_id}>
                                        product-id: {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.pricing_text}>
                            <p className={styles.price}>
                                {formattedPrice(price, currency)}
                            </p>
                            <div className={tooltip.tooltip_parent}>
                                <AddToCartBtn
                                    src="card"
                                    product={product.product_list[0]}
                                    onAdd={onAdd}
                                    handleClick={handleClick}
                                    btnClick={btnClick}
                                >
                                    <BsCartPlus
                                        className={styles.btn_icon}
                                        id={product.product_list[0].id}
                                    />
                                </AddToCartBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;
