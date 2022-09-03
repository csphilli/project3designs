import React, { useRef, useState } from "react";
import * as styles from "../../scss/admin/adminProductCard.module.scss";
import { formattedPrice } from "../../lib";
import { CgInfinity } from "react-icons/cg";
import AdminTextInput from "./AdminTextInput";
import { reqKeys } from "../../lib/admin/models";

function AdminProductCard(props) {
  const { product } = props;
  const [showForm, setShowForm] = useState(false);
  const [imageState, setImageState] = useState({
    currImage: product.image_url,
    newImage: "",
  });

  // Specifies which fields from the database are editable in the forms.

  // const getInputType = (key, item, index) => {
  //   const type = Object.keys(inputCategories).find((k) =>
  //     Object.values(inputCategories[k]).find((item) => item === test)
  //   );
  // };
  // switch (type) {
  //   case "number": {
  //     return (
  //       <AdminTextInput
  //         key={index}
  //         item={item}
  //         newFormValues={newFormValues}
  //         updateForm={updateForm}
  //         imageState={imageState}
  //         setImageState={setImageState}
  //         getInventory={getInventory}
  //       />
  //     );
  //   }
  //   case "radio": {
  //     return (
  //       <AdminTextInput
  //         key={index}
  //         item={item}
  //         newFormValues={newFormValues}
  //         updateForm={updateForm}
  //         imageState={imageState}
  //         setImageState={setImageState}
  //         getInventory={getInventory}
  //       />
  //     );
  //   }
  // }

  // const { number: a, text: b, radio: c, select: d } = inputCategories;
  // const test = "active";
  // let key = Object.keys(inputCategories).find((k) =>
  //   Object.values(inputCategories[k]).find((item) => item === test)
  // );
  // console.log(key);

  const currentFormValues = useRef(
    Object.entries(product).filter(([k]) => reqKeys.includes(k))
  );

  const newFormValues = useRef(currentFormValues.current.map(([k]) => [k, ""]));

  const getInventory = (amount) => {
    if (amount === 999) {
      return <CgInfinity className={styles.inf_icon} />;
    }
    return amount;
  };

  const updateProduct = (e) => {
    e.preventDefault();
    console.log("updating product");
    const obj = Object.fromEntries(currentFormValues.current);
    const data = newFormValues.current.map(([k, v]) => {
      if (v.length === 0) {
        return [k, obj[k]];
      }
      return [k, v];
    });

    console.log("Sending: ", data);

    toggleForm();

    /*
		TODO
		1: Send products to DB.
		Set loading spinner with modal overlay.
		2: Trigger a page reload once status is 200.
		3: Ensure correct types are being sent. Ie: Active is boolean
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

  const updateForm = (e, key) => {
    newFormValues.current.find(([k]) => k === key)[1] = e.target.value;
    if (key === "image_url") {
      setImageState({ ...imageState, newImage: e.target.value });
    }
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
          src={imageState.currImage}
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
        <div className={styles.toggle_btn_container}>
          <button className={styles.toggle_btn} onClick={toggleForm}>
            X
          </button>
        </div>

        <form id="admin_form" autoComplete="off">
          {currentFormValues.current.map((item, index) => (
            <AdminTextInput
              key={index}
              item={item}
              currentFormValues={currentFormValues}
              newFormValues={newFormValues}
              updateForm={updateForm}
              imageState={imageState}
              setImageState={setImageState}
              getInventory={getInventory}
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
