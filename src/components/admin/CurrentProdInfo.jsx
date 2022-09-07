import React from "react";
import { getFieldName } from "../../lib/admin/funcs";
import { adminInputCategories, reqKeys } from "../../lib/admin/models";
import * as styles from "../../scss/admin/currentProdInfo.module.scss";
import { adminSelectOptions } from "../../lib/admin/models";

function CurrentProdInfo(props) {
  const { product } = props;

  const getValue = (item, key) => {
    if (adminInputCategories.select.includes(item)) {
      return adminSelectOptions[item][key];
    }
    return key;
  };

  return (
    <div className={styles.current_info_container}>
      {reqKeys.map((item, index) => (
        <div className={styles.field_container} key={index}>
          <h3>{getFieldName(item)}</h3>
          <p>{getValue(item, product[item])}</p>
        </div>
      ))}
    </div>
  );
}

export default CurrentProdInfo;
