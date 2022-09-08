import React, { useState } from "react";
import * as styles from "../../scss/admin/adminEditProduct.module.scss";
import { formattedPrice } from "../../lib";
import { CgInfinity } from "react-icons/cg";
import ProductForm from "./ProductForm";
import CurrentProdInfo from "./CurrentProdInfo";

function AdminEditProduct(props) {
  const { product } = props;
  const [showModal, setShowModal] = useState(false);

  const getInventory =
    product.tax_code === "txcd_10302000" ? (
      <CgInfinity className={styles.inf_icon} />
    ) : (
      product.inventory
    );

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={styles.grid_container}>
      <div
        className={styles.product_section}
        onClick={toggleModal}
        id={product.product_id}
      >
        <img
          className={styles.image}
          src={product.image_url}
          alt="ERROR: NO IMAGE AT URL"
        />
        <div className={styles.product_text_container}>
          <div className={styles.field}>
            <p className={styles.heading}>Name:</p>
            <p>{product.name}</p>
          </div>
          <div className={styles.field}>
            <p className={styles.heading}>Price: </p>
            <p>{formattedPrice(product.price)}</p>
          </div>
          <div className={styles.field}>
            <p className={styles.heading}>Inventory: </p>
            <p className={styles.inventory_icon}>{getInventory}</p>
          </div>
          <div className={styles.field}>
            <p className={styles.heading}>Sale Limit:</p>
            <p>{product.sale_limit}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <div>
          <div className={styles.modal_overlay}></div>
          <section className={styles.modal_container}>
            <div className={styles.modal_pain}>
              <h3>Current Information</h3>
              <div className={styles.current_values_container}>
                <CurrentProdInfo product={product} />
              </div>
            </div>
            <div className={styles.modal_pain}>
              <h3>Update Information</h3>
              <ProductForm product={product} toggleModal={toggleModal} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminEditProduct;
