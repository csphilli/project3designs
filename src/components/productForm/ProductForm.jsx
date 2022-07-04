import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as formStyles from "../../scss/formElements/verticalForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";

const BUTTON_TEXT = {
    ADD: "Add to Cart",
    UPDATE: "Update Cart",
};

function ProductForm(props) {
    const { products } = props;
    const [btnText, setBtnText] = useState("");
    const [selection, setSelection] = useState(products[0]);
    const [maxQty, setMaxQty] = useState(products[0].maxQty);
    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const item = products.find(
            (item) => item.product_id === form.get("product_id")
        );
        item.quantity = Number(form.get("quantity"));
        setBtnText(updateBtnText(item.quantity));
    };

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setMaxQty(item.maxQty);
        console.log(selection);
    };

    const updateBtnText = (value) => {
        return value > 0 ? BUTTON_TEXT.UPDATE : BUTTON_TEXT.ADD;
    };

    useEffect(() => {
        setBtnText(updateBtnText(products[0].quantity));
    }, []);

    return (
        <form className={formStyles.container} onSubmit={updateQty}>
            <SelectField
                className={formStyles.select_field}
                html_for="size"
                name="product_id"
                options={products}
                handler={handleChange}
            />
            <NumberInput html_for="quantity" maxQty={maxQty} />
            <button className={formStyles.form_btn} type="submit">
                {btnText}
            </button>
        </form>
    );
}

export default ProductForm;
