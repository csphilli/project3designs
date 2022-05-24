import React, { useEffect } from "react";
import * as styles from "../scss/productModal.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BsFillInfoCircleFill } from "react-icons/bs";

function ProductModal(props) {
    const {
        product,
        cartItems,
        setCartItems,
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
    }, []);

    useEffect(() => {
        console.log(product.product_list);
    }, [cartItems]);
    // useEffect(() => {
    //     product.product_list.forEach((prod) => {
    //         const inCart = cartItems.find(
    //             (item) => item.description === prod.description
    //         );
    //         if (inCart) {
    //             prod.quantity = inCart.quantity;
    //         }
    //     });
    // }, [product.product_list, cartItems]);

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
                    item description details the differences.
                </p>
                {/* <div className={styles.modal_info_container}>
                    {product.product_list.map((item) => {
                        return (
                            <div className={styles.modal_info_line_item}>
                                <BsFillInfoCircleFill className={styles.icon} />
                                <p>product: {item.description}</p>
                                <p>max qty: {item.metadata.max_qty}</p>
                            </div>
                        );
                    })}
                </div> */}
                <div className={styles.cart_items_table}>
                    <div className={styles.cart_items_table_header}>
                        <p className={styles.heading}>Price</p>
                        <p className={styles.heading}>Product-Id</p>
                        {/* <p className={styles.heading}>Max Qty</p> */}
                        <p className={styles.heading}>In Cart</p>
                        {/* <p className={styles.heading}>Subtotal</p> */}
                    </div>
                    {product.product_list.map((item) => {
                        const btn = !item.clickAllowed
                            ? `${styles.button_prevent} ${styles.qty_plus_prevent}`
                            : `${styles.button} ${styles.qty_plus}`;
                        // console.log(btn);

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
                                {/* <p>{item.metadata.max_qty}</p> */}
                                <div className={styles.qty_container}>
                                    <button
                                        onClick={(e) => {
                                            // console.log(
                                            //     "plus clicked",
                                            //     item.clickAllowed
                                            // );

                                            !item.clickAllowed
                                                ? e.preventDefault()
                                                : onAdd(item);
                                        }}
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
