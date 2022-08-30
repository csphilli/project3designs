import React from "react";
import * as styles from "../../scss/admin/adminProductCard.module.scss";
import { formattedPrice } from "../../lib";
import { CgInfinity } from "react-icons/cg";

function AdminProductCard(props) {
  const { product } = props;

  const getInventory = (amount) => {
    if (amount === 999) {
      return <CgInfinity />;
    }
    return amount;
  };

  return (
    <div className={styles.product_section}>
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
          <p>{getInventory(product.inventory)}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.heading}>Sale Limit:</p>
          <p>{product.sale_limit}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
