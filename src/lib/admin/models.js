export const adminPanelSelectOptions = ["txcd_99999999", "txcd_10302000"];

export const adminInputCategories = {
  number: ["p3_id", "price", "inventory", "sale_limit"],
  text: ["name", "image_url", "project_link"],
  radio: ["active"],
  select: ["tax_code"],
};

export const radioInfo = [
  {
    id: "1",
    currName: "active",
    text: "Yes",
    value: "true",
    checked: true,
  },
  {
    id: "2",
    currName: "active",
    text: "No",
    value: "false",
    checked: false,
  },
];

export const reqKeys = [
  "p3_id",
  "price",
  "name",
  "inventory",
  "sale_limit",
  "image_url",
  "project_link",
  "active",
  "tax_code",
];
