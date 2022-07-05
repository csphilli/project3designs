import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as styles from "../../scss/formElements/verticalForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";
import { formattedPrice } from "../../lib";
import { saveToLocal } from "../../lib";

const BUTTON_TEXT = {
    ADD: "Add to Cart",
    UPDATE: "Update Cart",
    SOLD_OUT: "Sold Out",
};

function ProductForm(props) {
    const { products } = props;
    const [selection, setSelection] = useState(products[0]);
    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const item = products.find(
            (item) => item.product_id === form.get("product_id")
        );
        item.quantity = Number(form.get("quantity"));
        saveToLocal(item.product_id, item);
    };

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setSelection(item);
    };

    return (
        <form className={styles.container} onSubmit={updateQty}>
            <div>quantity: {selection.quantity}</div>
            <SelectField
                html_for="product"
                name="product_id"
                options={products}
                handler={handleChange}
            />
            <NumberInput html_for="quantity" maxQty={selection.maxQty} />
            <p className={styles.price}>{formattedPrice(selection.price)}</p>
            <button type="submit">Add to Cart</button>
        </form>
    );
}

export default ProductForm;
