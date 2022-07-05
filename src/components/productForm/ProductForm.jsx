import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as styles from "../../scss/formElements/productForm.module.scss";
import ProductCartIcon from "../cart/ProductCartIcon";
import { formattedPrice, saveToLocal } from "../../lib";

const TEXT = {
    CART: "Add to Cart",
    SOLD_OUT: "Sold Out",
};

function ProductForm(props) {
    const { products } = props;
    const [selection, setSelection] = useState(products[0]);
    const [showCartIcon, setShowCartIcon] = useState(
        products[0].quantity > 0 ? true : false
    );
    const checkCartIcon = () => {
        return selection.quantity > 0;
    };

    useEffect(() => {
        setShowCartIcon(checkCartIcon());
    }, [selection]);

    const addToCart = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const item = products.find(
            (item) => item.product_id === form.get("product_id")
        );
        item.quantity += 1;
        setShowCartIcon(true);
        saveToLocal(item.product_id, item);
    };

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setShowCartIcon(checkCartIcon());
        setSelection(item);
    };

    return (
        <form className={styles.container} onSubmit={addToCart}>
            <p className={styles.price}>{formattedPrice(selection.price)}</p>
            <SelectField
                html_for="product"
                name="product_id"
                options={products}
                handler={handleChange}
            />
            {showCartIcon ? (
                <>
                    <NumberInput
                        html_for="quantity"
                        product={selection}
                        setShowCartIcon={setShowCartIcon}
                    />
                    <ProductCartIcon qty={selection.quantity} />
                </>
            ) : selection.maxQty > 0 ? (
                <button className={styles.form_btn} type="submit">
                    {TEXT.CART}
                </button>
            ) : (
                <p className={styles.sold_out_text}>
                    <em>{TEXT.SOLD_OUT}</em>
                </p>
            )}
        </form>
    );
}

export default ProductForm;
