import React, { useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as styles from "../../scss/formElements/productForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";
import { formattedPrice } from "../../lib";
import { saveToLocal } from "../../lib";

const TEXT = {
    CART: "Add to Cart",
};

function ProductForm(props) {
    const { products } = props;
    const [selection, setSelection] = useState(products[0]);
    const updateQty = (e) => {
        e.preventDefault();
        console.log("updating cart");

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
            {/* <NumberInput html_for="quantity" maxQty={selection.maxQty} /> */}
            <NumberInput
                html_for="quantity"
                product={selection}
                updateQty={updateQty}
            />
            <p className={styles.price}>{formattedPrice(selection.price)}</p>
            <button className={styles.form_btn} type="submit">
                {TEXT.CART}
            </button>
        </form>
    );
}

export default ProductForm;
