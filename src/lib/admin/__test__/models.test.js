const { reqKeys, adminSelectOptions } = require("../models");
const { getInputType, getFormSelectValue, getFieldName } = require("../funcs");

describe("Admin panel tests", () => {
  test("Testing reqKeys are matched to Category", () => {
    const expected = ["number", "text", "select"];
    reqKeys.forEach((key) => {
      expect(expected).toContain(getInputType(key));
    });
  });
  test("Testing getFieldName only takes accepted values", () => {
    const expected = ["product type", "status", ...reqKeys];
    reqKeys.forEach((key) => {
      expect(expected).toContain(getFieldName(key).toLowerCase());
    });
  });
  describe("Testing for valid adminSelectOptions values", () => {
    test("Testing tax code (product types) values", () => {
      const expected = ["Physical", "Digital"];
      const keys = ["txcd_99999999", "txcd_10302000"];
      keys.forEach((key, index) => {
        expect(getFormSelectValue("tax_code", key)).toBe(expected[index]);
      });
    });
    test("Testing status codes (active state) values", () => {
      const expected = ["Active", "Inactive"];
      const keys = ["true", "false"];
      keys.forEach((key, index) => {
        expect(getFormSelectValue("status", key)).toBe(expected[index]);
      });
    });
  });
});
