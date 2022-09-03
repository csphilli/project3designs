import React, { useEffect, useState } from "react";
import * as styles from "../../scss/admin/radioFields.module.scss";
import { radioInfo } from "../../lib/admin/models";

function RadioFields(props) {
  const { updateForm, value } = props;

  useEffect(() => {
    arrRadios.forEach((item) => {
      if (item.value === value.toString()) {
        item.checked = true;
      } else item.checked = false;
    });
    setArrRadios([...arrRadios]);
  }, []);

  const [arrRadios, setArrRadios] = useState(radioInfo);

  const handleRadioChange = (e) => {
    arrRadios.forEach((obj) => {
      if (obj.value === e.target.value) {
        obj.checked = true;
      } else obj.checked = false;
    });
    setArrRadios([...arrRadios]);
    updateForm(e, "active");
  };

  return (
    <div className={styles.radio_container}>
      {arrRadios &&
        arrRadios.map((radio) => (
          <div key={radio.id} className={styles.radio_input_container}>
            <label htmlFor={radio.name}>{radio.text}</label>
            <input
              type="radio"
              id={radio.id}
              value={radio.value}
              checked={radio.checked}
              onChange={handleRadioChange}
            />
          </div>
        ))}
    </div>
  );
}

export default RadioFields;
