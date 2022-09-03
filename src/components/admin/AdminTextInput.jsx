import React, { useEffect, useState } from "react";
import * as styles from "../../scss/admin/adminFormField.module.scss";
import RadioFields from "./RadioFields";
import SelectFields from "./SelectFields";
import { getInputType } from "../../lib/admin/funcs";

function AdminTextInput(props) {
  const {
    currentFormValues,
    newFormValues,
    getInventory,
    updateForm,
    item,
    imageState,
  } = props;
  const [key, value] = item;
  const [ph, setPh] = useState("");

  useEffect(() => {
    const exists = newFormValues.current.find(([k]) => k === key);
    if (exists) setPh(exists[1]);
  }, [key, newFormValues]);

  if (key === "tax_code") {
    return (
      <div className={styles.outer_field_container}>
        <h3>{key}</h3>
        <div className={styles.inner_field_container}>
          <SelectFields
            currentFormValues={currentFormValues}
            updateForm={updateForm}
            value={value}
            pkey={key}
          />
        </div>
      </div>
    );
  } else if (key === "active") {
    return (
      <div className={styles.outer_field_container}>
        <h3>{key}</h3>
        <div className={styles.inner_field_container}>
          <RadioFields updateForm={updateForm} value={value} />
        </div>
      </div>
    );
  } else if (key === "image_url") {
    return (
      <div className={styles.outer_field_container}>
        <h3>{key}</h3>
        <div className={styles.inner_field_container}>
          <div className={styles.img_info_wrapper}>
            <p>Current:</p>
            <div className={styles.current_value}>
              <img src={imageState.currImage} alt="product" />
            </div>
          </div>
          <div className={styles.img_info_wrapper}>
            <p>New:</p>
            <img src={imageState.newImage} alt="INVALID IMAGE LINK" />
          </div>
          <div className={styles.img_input_wrapper}>
            <label htmlFor={key}></label>
            <input
              type={getInputType(key)}
              name={key}
              id={key}
              placeholder={key}
              onChange={(e) => {
                updateForm(e, key);
              }}
              onWheel={(e) => e.target.blur()}
            ></input>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.outer_field_container}>
        <h3>{key}</h3>
        <div className={styles.inner_field_container}>
          <div className={styles.info_wrapper}>
            <p>Current:</p>
            <p className={styles.current_value}>{getInventory(value)}</p>
          </div>
          <div className={styles.info_wrapper}>
            <p>New:</p>
            <p className={styles.new_value}>{ph}</p>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor={key}></label>
            <input
              type={getInputType(key)}
              name={key}
              id={key}
              placeholder={`New ${key}:`}
              onChange={(e) => {
                updateForm(e, key);
                setPh(e.target.value);
              }}
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTextInput;
