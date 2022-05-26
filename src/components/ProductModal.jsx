import React, { useEffect } from "react";
import * as styles from "../scss/productModal.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductModal(props) {
    const {
        product,
        handleClick,
        onAdd,
        onMinus,
        formattedPrice,
        toggleModal,
    } = props;
    const img = getImage(
        product.product_list[0].localFiles[0].childImageSharp.gatsbyImageData
    );

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
                <div className={styles.menu_bar}>
                    <p className={styles.menu_bar_text}>
                        Select specific variation
                    </p>
                    <button
                        className={styles.close_modal_btn}
                        onClick={toggleModal}
                    >
                        X
                    </button>
                </div>
                <GatsbyImage
                    className={styles.content_img}
                    image={img}
                    alt="picture of product"
                />
                <h4 className={styles.modal_title}>
                    {product.product_list[0].name}
                </h4>
                <p>
                    There are multiple choices for this specific product. The
                    product-id details the differences.
                </p>
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Price</p>
                        <p className={styles.heading}>Product-Id</p>
                        <p className={styles.heading}>In Cart</p>
                    </div>
                    {product.product_list.map((item) => {
                        const btn = !item.clickAllowed
                            ? `${styles.button_prevent} ${styles.qty_plus_prevent}`
                            : `${styles.button} ${styles.qty_plus}`;
                        return (
                            <div key={item.id} className={styles.list_item}>
                                <p className={styles.modal_price}>
                                    {formattedPrice(item.price)}
                                </p>
                                <p>{item.description}</p>
                                <div className={styles.qty_container}>
                                    <button
                                        onClick={(e) => {
                                            if (!item.clickAllowed) {
                                                e.preventDefault();
                                            } else {
                                                onAdd(item);
                                                handleClick();
                                            }
                                        }}
                                        className={btn}
                                    >
                                        +
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button
                                        onClick={(e) => {
                                            onMinus(item);
                                            handleClick();
                                        }}
                                        className={`${styles.button} ${styles.qty_minus}`}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}

export default ProductModal;
