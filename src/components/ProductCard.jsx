import React, { useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import { BsCartPlus, BsFillInfoCircleFill, BsThreeDots } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ProductModal from "./ProductModal";

function ProductCard(props) {
    const { cartItems, setCartItems, product, onAdd, onMinus, formattedPrice } =
        props;
    const [showModal, setShowModal] = useState(false);
    const featured = product.product_list[0];
    let btn = styles.btn_container;

    const toggleModal = () => {
        setShowModal(!showModal);
        if (showModal) document.body.style.overflow = "unset";
        if (!showModal) document.body.style.overflow = "hidden";
    };

    // if (cartItems.length > 0) {
    //     const exist = cartItems.find((obj) => obj.id === product.id);
    //     if (exist && !exist.clickAllowed) {
    //         btn = `${styles.btn_container_prevent} ${styles.btn_prevent}`;
    //         clickAllowed = false;
    //     }
    // }

    if (cartItems.length > 0) {
        // const exist = cartItems.find((obj) => obj.id === featured.id);
        const exist = cartItems.find((obj) => obj.id === featured.id);

        if (exist && !exist.clickAllowed) {
            btn = `${styles.btn_container_prevent} ${styles.btn_prevent}`;
        }
    }

    // const img = getImage(product.localFiles[0].childImageSharp.gatsbyImageData);

    if (product.product_list.length > 1) {
        let i = 0;
        const { name } = product.product_list[i];
        const { slug } = product.product_list[i].metadata;
        const img = getImage(
            product.product_list[i].localFiles[0].childImageSharp
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
                            <GatsbyImage image={img} alt="picture of product" />
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
                                <div
                                    className={
                                        styles.purchase_info_inner_container
                                    }
                                >
                                    <p>max qty: ...</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.pricing_text}>
                            <p className={styles.price}>€</p>
                            <button
                                className={styles.btn_container}
                                // this onclick will open modal
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
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        onAdd={onAdd}
                        onMinus={onMinus}
                        formattedPrice={formattedPrice}
                    />
                ) : null}
            </div>
        );
    } else {
        const index = product.product_list.length - 1;
        const { price, currency, name, description } =
            product.product_list[index];
        // const { p3d_id } = product;
        const { slug, max_qty } = product.product_list[index].metadata;
        const img = getImage(
            product.product_list[index].localFiles[index].childImageSharp
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
                            <GatsbyImage image={img} alt="picture of product" />
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
                                <div
                                    className={
                                        styles.purchase_info_inner_container
                                    }
                                >
                                    <p>max qty: {max_qty}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.pricing_text}>
                            <p className={styles.price}>
                                {formattedPrice(price, currency)}
                            </p>
                            <button
                                className={btn}
                                onClick={
                                    (e) =>
                                        !featured.clickAllowed
                                            ? e.preventDefault()
                                            : onAdd(product.product_list[index]) // will have to change this to account for multiple varations of product
                                }
                            >
                                <BsCartPlus
                                    className={styles.btn_icon}
                                    id={featured.id}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;
