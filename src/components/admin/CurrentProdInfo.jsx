import React from "react";
import { getFieldName } from "../../lib/admin/funcs";
import { reqKeys } from "../../lib/admin/models";
import * as styles from "../../scss/admin/currentProdInfo.module.scss";
import { adminSelectOptions } from "../../lib/admin/models";

function CurrentProdInfo(props) {
  const { product } = props;
  //   const { tax_code: tc, active: status } = adminSelectOptions;
  //   const [typeOptions, setTypeOptions] = useState(tc[product.tax_code]);
  //   const [statusOptions, setStatusOptions] = useState(status[product.active]);

  const getValue = (item, key) => {
    // return product[item][key];
    console.log(item, key);

    return "testing";
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
