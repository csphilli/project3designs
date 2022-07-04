import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as formStyles from "../../scss/formElements/verticalForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";

const BUTTON_TEXT = {
    ADD: "Add to Cart",
    UPDATE: "Update Cart",
    SOLD_OUT: "Sold Out",
};

function ProductForm(props) {
    const { products } = props;
    const [btnText, setBtnText] = useState("");
    const [btnStyle, setBtnStyle] = useState();
    const [maxQty, setMaxQty] = useState(products[0].maxQty);
    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const item = products.find(
            (item) => item.product_id === form.get("product_id")
        );
        item.quantity = Number(form.get("quantity"));
        setBtnText(updateBtnText(item.maxQty, item.quantity));
    };

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setMaxQty(item.maxQty);
        setBtnText(updateBtnText(item.maxQty, item.quantity));
        setBtnStyle(updateBtnStyle(item.maxQty));
        console.log(item);
    };

    const updateBtnText = (itemMaxQty, itemQty) => {
        return itemMaxQty === 0
            ? BUTTON_TEXT.SOLD_OUT
            : itemQty > 0
            ? BUTTON_TEXT.UPDATE
            : BUTTON_TEXT.ADD;
    };

    const updateBtnStyle = (itemMaxQty) => {
        return itemMaxQty === 0
            ? formStyles.form_btn_prevent
            : formStyles.form_btn;
    };

    useEffect(() => {
        setBtnText(updateBtnText(products[0].quantity));
        setBtnStyle(updateBtnStyle(products[0].maxQty));
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
            <button className={btnStyle} type="submit">
                {btnText}
            </button>
        </form>
    );
}

export default ProductForm;
