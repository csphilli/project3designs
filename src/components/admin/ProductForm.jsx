import React, { useState } from "react";
import { getInputType, getFieldName } from "../../lib/admin/funcs";
import {
  reqKeys,
  adminSelectOptions,
  adminInputCategories,
} from "../../lib/admin/models";
import * as styles from "../../scss/admin/productForm.module.scss";

function ProductForm(props) {
  const { product, toggleModal } = props;
  const { tax_code: tc, status } = adminSelectOptions;
  const [typeOptions, setTypeOptions] = useState(tc[product.tax_code]);
  const [statusOptions, setStatusOptions] = useState(status[product.status]);

  const handleSelectionChange = (e, key) => {
    if (key === "tax_code") {
      setTypeOptions(e.target.value);
    } else if (key === "status") {
      setStatusOptions(e.target.value);
    } else
      console.error(`Product form change handler for ${key} doesn't exist`);
  };

  const submitForm = (e) => {
    e.preventDefault(); // remove when done
    console.log("submit clicked");
  };

  const cancelForm = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <form id="admin_form" autoComplete="off">
      {reqKeys.map((item, index) => {
        const type = getInputType(item);
        if (type === "number" || type === "text") {
          return (
            <div className={styles.field_container} key={index}>
              <h3>{getFieldName(item)}</h3>
              <label htmlFor={item}>
                <input
                  id={item}
                  type={type}
                  name={item}
                  placeholder={`New ${item}`}
                ></input>
              </label>
            </div>
          );
        }
      })}
      {adminInputCategories.select.map((item, index) => (
        <div className={styles.field_container} key={index}>
          <h3>{getFieldName(item)}</h3>
          <label htmlFor={item}>
            <select
              id={item}
              value={item === "tax_code" ? typeOptions : statusOptions}
              onChange={(e) => handleSelectionChange(e, item)}
            >
              {Object.keys(adminSelectOptions[item]).map((obj, index) => (
                <option key={index} value={adminSelectOptions[item][obj]}>
                  {adminSelectOptions[item][obj]}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <div className={styles.button_container}>
        <button
          onClick={submitForm}
          className={`${styles.form_btn} ${styles.submit}`}
        >
          Submit
        </button>
        <button
          onClick={cancelForm}
          className={`${styles.form_btn} ${styles.cancel}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default ProductForm;
