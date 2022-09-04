import { adminInputCategories } from "./models";

export const getInputType = (key) => {
  return Object.keys(adminInputCategories).find((k) =>
    Object.values(adminInputCategories[k]).find((item) => item === key)
  );
};

export const getFieldName = (item) => {
  if (item === "tax_code") {
    return "Product Type";
  } else if (item === "active") {
    return "Status";
  }
  return item[0].toUpperCase() + item.substring(1);
};
