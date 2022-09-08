// Used for populating the drop down menues in the product form given the keys found in the adminInputCategories.select array. Keys MUST match to those values
const adminSelectOptions = {
  tax_code: {
    txcd_99999999: "Physical",
    txcd_10302000: "Digital",
  },
  status: { true: "Active", false: "Inactive" },
};

// Used to decide which form input method is used in the ProductForm. For the select values, they MUST match the adminSelectOptions keys above. These values also represent the column row name from the database (currently supabase but will change to mongo)
const adminInputCategories = {
  number: ["p3_id", "price", "inventory", "sale_limit"],
  text: ["name", "image_url", "project_link", "description"],
  select: ["tax_code", "status"],
};

// These keys represent the input fields that will populate on the product forms. More data exists in the database for each product but these are the editable ones.
const reqKeys = [
  "name",
  "price",
  "inventory",
  "sale_limit",
  "p3_id",
  "image_url",
  "project_link",
  "description",
  "tax_code",
  "status",
];

module.exports = {
  adminSelectOptions: adminSelectOptions,
  adminInputCategories: adminInputCategories,
  reqKeys: reqKeys,
};