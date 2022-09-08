import React from "react";
import { getFieldName } from "../../lib/admin/funcs";
import * as styles from "../../scss/admin/currentProdInfo.module.scss";
const { getFormSelectValue } = require("../../lib/admin/funcs");
const { reqKeys } = require("../../lib/admin/models");

function CurrentProdInfo(props) {
  const { product } = props;

  return (
    <div className={styles.current_info_container}>
      {reqKeys.map((item, index) => (
        <div className={styles.field_container} key={index}>
          <h3>{getFieldName(item)}</h3>
          <p>
            {item === "status" || item === "tax_code"
              ? getFormSelectValue(item, product[item])
              : product[item]}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CurrentProdInfo;
