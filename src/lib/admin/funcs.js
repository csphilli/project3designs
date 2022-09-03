import { adminInputCategories } from "./models";

export const getInputType = (key) => {
  return Object.keys(adminInputCategories).find((k) =>
    Object.values(adminInputCategories[k]).find((item) => item === key)
  );
};
