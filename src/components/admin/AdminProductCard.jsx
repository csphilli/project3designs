import React, { useRef, useState } from "react";
import * as styles from "../../scss/admin/adminProductCard.module.scss";
import { formattedPrice } from "../../lib";
import { CgInfinity } from "react-icons/cg";
import AdminFormField from "./AdminFormField";

function AdminProductCard(props) {
  const { product } = props;
  const [showForm, setShowForm] = useState(false);
  const currentFormValues = useRef({
    p3_id: product.p3_id,
    price: product.unit_amount,
    name: product.name,
    inventory: product.inventory,
    sale_limit: product.sale_limit,
    image_url: product.image_url,
    project_link: product.slug,
    size: product.size,
    active: product.active,
  });

  const newFormValues = useRef({
    p3_id: "",
    price: "",
    name: "",
    inventory: "",
    sale_limit: "",
    image_url: "",
    project_link: "",
    size: "",
    active: "",
  });

  const getInventory = (amount) => {
    if (amount === 999) {
      return <CgInfinity className={styles.inf_icon} />;
    }
    return amount;
  };

  const updateProduct = (e) => {
    e.preventDefault();
    console.log("updating product");
    const data = JSON.parse(JSON.stringify(newFormValues.current));
    for (const prop in data) {
      if (`${data[prop]}` === "") {
        newFormValues.current[prop] = currentFormValues.current[prop];
      }
    }
    console.log(newFormValues.current);

    toggleForm();

    /*
		TODO
		1: Send products to DB.
		Set loading spinner with modal overlay.
		2: Trigger a page reload once status is 200.
		*/
  };

  const cancelChanges = () => {
    for (const prop in newFormValues.current) {
      newFormValues.current[prop] = "";
    }
    toggleForm();
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const updateForm = (e, field) => {
    newFormValues.current[`${field}`] = e.target.value;
  };

  if (!showForm) {
    return (
      <div
        className={styles.product_section}
        onClick={toggleForm}
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
            <p className={styles.inventory_icon}>
              {getInventory(product.inventory)}
            </p>
          </div>
          <div className={styles.field}>
            <p className={styles.heading}>Sale Limit:</p>
            <p>{product.sale_limit}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <section className={styles.edit_product_form_container}>
        <div className={styles.header_container}>
          <h2 className={styles.edit_title}>Editing product...</h2>
          <button className={styles.toggle_btn} onClick={toggleForm}>
            X
          </button>
        </div>
        <div className={styles.info_wrapper}>
          <p className={styles.column_heading}>Current</p>
          <p className={styles.separator}>→</p>
          <p className={styles.column_heading}>Updated</p>
        </div>
        <form autoComplete="off">
          {Object.keys(newFormValues.current).map((item, index) => (
            <AdminFormField
              key={index}
              item={item}
              currentFormValues={currentFormValues}
              newFormValues={newFormValues}
              updateForm={updateForm}
            />
          ))}
        </form>
        <div className={styles.button_container}>
          <button onClick={updateProduct}>Submit</button>
          <button onClick={cancelChanges}>Cancel Changes</button>
        </div>
      </section>
    );
  }
}

export default AdminProductCard;
