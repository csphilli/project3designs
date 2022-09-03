import React, { useEffect, useState } from "react";
import * as styles from "../../scss/admin/adminFormField.module.scss";

function AdminFormField(props) {
  const { newFormValues, currentFormValues, updateForm, item } = props;
  const [ph, setPh] = useState("");
  const nbrs = ["price", "p3_id", "sale_limit", "inventory"];

  const placeholder = `New ${
    item.substring(0, 1).toUpperCase() + item.substring(1)
  }`;

  useEffect(() => {
    if (newFormValues.current[`${item}`] !== "") {
      setPh(newFormValues.current[`${item}`]);
    }
  }, [item, newFormValues]);

  const getType = (v) => {
    if (nbrs.includes(v)) {
      return "number";
    } else return "text";
  };

  if (item === "active") {
    return (
      <div className={styles.outer_field_container}>
        <h3>{placeholder.split(" ")[1]}</h3>
        <div className={styles.inner_field_container}>
          <div className={styles.radio_wrapper}>
            <label htmlFor="p_active">Yes</label>
            <input
              type="radio"
              id="p_active"
              name="active"
              value="true"
              onChange={(e) => {
                updateForm(e, item);
              }}
            />
          </div>
          <div className={styles.radio_wrapper}>
            <label htmlFor="p_inactive">No</label>
            <input
              type="radio"
              id="p_inactive"
              name="active"
              value="false"
              onChange={(e) => {
                updateForm(e, item);
              }}
            ></input>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.outer_field_container}>
        <h3>{placeholder.split(" ")[1]}</h3>
        <div className={styles.inner_field_container}>
          <div className={styles.info_wrapper}>
            <p className={styles.current_value}>
              {currentFormValues.current[`${item}`]}
            </p>
            <p className={styles.separator}>→</p>
            <p className={styles.new_value}>{ph}</p>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor={item}></label>
            <input
              type={getType(item)}
              name={item}
              id={item}
              placeholder={placeholder}
              onChange={(e) => {
                updateForm(e, item);
                setPh(e.target.value);
              }}
              onWheel={(e) => e.target.blur()}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminFormField;
