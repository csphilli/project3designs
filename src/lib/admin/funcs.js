const { adminInputCategories, adminSelectOptions } = require("./models");

const getInputType = (key) => {
  const value = Object.keys(adminInputCategories).find((k) =>
    Object.values(adminInputCategories[k]).find((item) => item === key)
  );
  if (!value) {
    return "Invalid Input Key";
  }
  return value;
};

const getFormSelectValue = (item, key) => {
  if (adminInputCategories.select.includes(item)) {
    return adminSelectOptions[item][key];
  } else return "Invalid Select Value";
};

const getFieldName = (item) => {
  if (item === "tax_code") {
    return "Product Type";
  } else if (item === "active") {
    return "Status";
  }
  return item[0].toUpperCase() + item.substring(1);
};

module.exports = {
  getInputType: getInputType,
  getFieldName: getFieldName,
  getFormSelectValue: getFormSelectValue,
};
