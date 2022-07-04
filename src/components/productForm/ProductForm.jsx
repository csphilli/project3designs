import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as styles from "../../scss/formElements/verticalForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";
import FormButton from "./FormButton";
import { formattedPrice } from "../../lib";
import { UpdateLocal } from "../../lib";

const BUTTON_TEXT = {
    ADD: "Add to Cart",
    UPDATE: "Update Cart",
    SOLD_OUT: "Sold Out",
};

function ProductForm(props) {
    const { products } = props;
    const [btnText, setBtnText] = useState("");
    const [maxQty, setMaxQty] = useState(products[0].maxQty);
    const [price, setPrice] = useState(formattedPrice(products[0].price));
    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const item = products.find(
            (item) => item.product_id === form.get("product_id")
        );
        item.quantity = Number(form.get("quantity"));
        setBtnText(updateBtnText(item.maxQty, item.quantity));
        UpdateLocal(item.product_id, item);
    };

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setMaxQty(item.maxQty);
        setBtnText(updateBtnText(item.maxQty, item.quantity));
        setPrice(formattedPrice(item.price));
    };

    const updateBtnText = (itemMaxQty, itemQty) => {
        return itemMaxQty === 0
            ? BUTTON_TEXT.SOLD_OUT
            : itemQty > 0
            ? BUTTON_TEXT.UPDATE
            : BUTTON_TEXT.ADD;
    };

    const allowBtnClick = (itemMaxQty) => {
        return itemMaxQty === 0 ? false : true;
    };

    useEffect(() => {
        setBtnText(updateBtnText(products[0].maxQty));
    }, []);

    return (
        <form className={styles.container} onSubmit={updateQty}>
            <SelectField
                html_for="product"
                name="product_id"
                options={products}
                handler={handleChange}
            />
            <NumberInput html_for="quantity" maxQty={maxQty} />
            <p className={styles.price}>{price}</p>
            <FormButton allow={allowBtnClick(maxQty)} text={btnText} />
        </form>
    );
}

export default ProductForm;
