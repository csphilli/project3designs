import React, { useState } from "react";
import * as styles from "../../scss/admin/selectFields.module.scss";
import { adminPanelSelectOptions as options } from "../../lib/admin/models";

function SelectFields(props) {
  const { updateForm, pkey, value } = props;
  //   console.log(value);

  const [selection, setSelection] = useState(value);

  return (
    <div className={styles.selection_container}>
      <label />
      <select
        className={styles.menu_container}
        // id={name}
        // name={name}
        value={selection}
        onChange={(e) => {
          console.log(e.target.value);

          setSelection(e.target.value);
          updateForm(e, pkey);
        }}
      >
        {options.map((op, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFields;
