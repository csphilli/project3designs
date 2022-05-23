import React from "react";
import * as styles from "../scss/productModal.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function ProductModal(props) {
    const { product, cartItems, setCartItems, onAdd, onMinus, formattedPrice } =
        props;
    const img = getImage(
        product.product_list[0].localFiles[0].childImageSharp.gatsbyImageData
    );
    // console.log("product", product);

    return (
        <aside className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.menu_bar}>
                    <p className={styles.menu_bar_text}>
                        Select specific variation
                    </p>
                    <button className={styles.close_modal_btn}>X</button>
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
                    item description details the differences.
                </p>
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Price</p>
                        <p className={styles.heading}>Description</p>
                        <p className={styles.heading}>Max Qty</p>
                        <p className={styles.heading}>In Cart</p>
                        {/* <p className={styles.heading}>Subtotal</p> */}
                    </div>
                    {product.product_list.map((item) => {
                        const btn = !item.clickAllowed
                            ? `${styles.button_prevent} ${styles.qty_plus_prevent}`
                            : `${styles.button} ${styles.qty_plus}`;

                        // const subtotal = formattedPrice(
                        //     item.price * item.quantity,
                        //     item.currency
                        // );
                        return (
                            <div key={item.id} className={styles.list_item}>
                                <p className={styles.modal_price}>
                                    {formattedPrice(item.price)}
                                </p>
                                <p>{item.description}</p>
                                <p>{item.metadata.max_qty}</p>
                                <div className={styles.qty_container}>
                                    <button
                                        onClick={(e) =>
                                            !item.clickAllowed
                                                ? e.preventDefault()
                                                : onAdd(item)
                                        }
                                        className={btn}
                                    >
                                        +
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button
                                        onClick={(e) => onMinus(item)}
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
