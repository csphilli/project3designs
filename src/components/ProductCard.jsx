import React, { useEffect, useState } from "react";
import * as styles from "../scss/productCard.module.scss";
import * as tooltip from "../scss/tooltip.module.scss";
import { BsCartPlus, BsFillInfoCircleFill, BsThreeDots } from "react-icons/bs";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ProductModal from "./ProductModal";
import AddToCartBtn from "./AddToCartBtn";
import { formattedPrice } from "../lib";

function ProductCard(props) {
    const { product, handleClick, btnClick, onAdd, onMinus } = props;
    const [showModal, setShowModal] = useState(false);

    // const toggleModal = () => {
    //     setShowModal(!showModal);
    //     if (showModal) document.body.style.overflow = "unset";
    //     if (!showModal) document.body.style.overflow = "hidden";
    // };

    useEffect(() => {
        if (showModal) document.body.style.overflow = "unset";
        if (!showModal) document.body.style.overflow = "hidden";
    }, [showModal]);

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                // setShowModal(false);
                setShowModal(false);
                document.activeElement.blur();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
        // }, [setShowModal]);
    }, [showModal]);

    // if (product.product_list.length > 1) {
    //     const { name, project_url, image_url } = product.product_list[0];
    //     // const { project_url } = product.product_list[0].metadata;
    //     // const img = getImage(
    //     //     product.product_list[0].localFiles[0].childImageSharp
    //     //         .gatsbyImageData
    //     // );

    //     // return html with modal
    //     return (
    //         <div>
    //             <div className={styles.product_card}>
    //                 <div>
    //                     <a
    //                         href={`/projects/${project_url}`}
    //                         target="_blank"
    //                         rel="noreferrer"
    //                     >
    //                         {/* <GatsbyImage
    //                             className={styles.image_container}
    //                             image={image_url}
    //                             alt="picture of the product"
    //                         /> */}
    //                         <img
    //                             className={styles.image_container}
    //                             src={image_url}
    //                             alt="product"
    //                         />
    //                     </a>
    //                 </div>
    //                 <div>
    //                     <div>
    //                         <h3 className={styles.title}>{name}</h3>
    //                         <div
    //                             className={styles.purchase_info_outer_container}
    //                         >
    //                             <div
    //                                 className={
    //                                     styles.purchase_info_inner_container
    //                                 }
    //                             >
    //                                 <BsFillInfoCircleFill />
    //                                 <p className={styles.purchase_info_id}>
    //                                     product-id: multiple
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className={styles.pricing_text}>
    //                         <p className={styles.price}>€</p>
    //                         <button
    //                             className={styles.btn_container}
    //                             onClick={toggleModal}
    //                         >
    //                             <BsThreeDots />
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //             {showModal ? (
    //                 <ProductModal
    //                     toggleModal={toggleModal}
    //                     product={product}
    //                     btnClick={btnClick}
    //                     handleClick={handleClick}
    //                     onAdd={onAdd}
    //                     onMinus={onMinus}
    //                     formattedPrice={formattedPrice}
    //                 />
    //             ) : null}
    //         </div>
    //     );
    // } else {

    const { price, currency, name, desc, project_url, image_url } =
        product.product_list[0];
    return (
        <div className={styles.product_card} onClick={() => setShowModal(true)}>
            {/* <div className={styles.product_card} onClick={() => toggleModal()}> */}
            <div className={styles.image_container}>
                <img src={image_url} alt="picture of product" />
            </div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.price}>{formattedPrice(price, currency)}</p>
            {showModal && (
                <ProductModal
                    setShowModal={setShowModal}
                    // showModal={showModal}
                    product={product}
                    // btnClick={btnClick}
                    // handleClick={handleClick}
                    // onAdd={onAdd}
                    // onMinus={onMinus}
                    // formattedPrice={formattedPrice}
                    // toggleModal={toggleModal}
                />
            )}
        </div>
    );
    // }
}

export default ProductCard;
