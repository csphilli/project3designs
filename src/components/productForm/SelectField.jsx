import React from "react";
import * as formStyles from "../../scss/formElements/productForm.module.scss";

function SelectField(props) {
  const { html_for, name, options, handler } = props;
  return (
    <div className={formStyles.selection_container}>
      <label htmlFor={html_for}>
        {html_for[0].toUpperCase() + html_for.slice(1) + ":"}
      </label>
      <select
        className={formStyles.menu_container}
        id={name}
        name={name}
        onChange={handler}
      >
        {options.map((item) => (
          <option key={item.id} value={item.product_id}>
            {/* { TODO: change to item.description} */}
            {item.size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
