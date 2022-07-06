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

const MIN = 1;

function ProductForm(props) {
    const { products } = props;
    const [selection, setSelection] = useState(products[0]);
    const [inputValue, setInputValue] = useState(products[0].quantity);
    const [showCartIcon, setShowCartIcon] = useState(
        products[0].quantity > 0 ? true : false
    );
    const checkCartIcon = () => {
        return selection.quantity > 0;
    };

    useEffect(() => {
        setShowCartIcon(checkCartIcon());
    }, [selection, inputValue]);

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setShowCartIcon(checkCartIcon());
        setInputValue(item.quantity);
        setSelection(item);
        console.log(selection);
    };

    ///

    const onAdd = (e) => {
        e.preventDefault();
        console.log(`onAdd. Qty: ${selection.quantity}`);

        if (selection.quantity + 1 <= selection.maxQty) {
            selection.quantity += 1;
            setInputValue((prev) => prev + 1);
        }
        setShowCartIcon(checkCartIcon());
        saveToLocal(selection.product_id, selection);
    };

    const onMinus = (e) => {
        console.log(`onMinus. cQty: ${selection.quantity}`);
        e.preventDefault();
        if (selection.quantity - 1 >= MIN) {
            selection.quantity -= 1;
            setInputValue((prev) => prev - 1);
        }
        saveToLocal(selection.product_id, selection);
    };

    const onDelete = (e) => {
        e.preventDefault();
        selection.quantity = 0;
        setInputValue(0);
        saveToLocal(selection.product_id, selection);
        setShowCartIcon(false);
    };

    ///

    return (
        <form className={styles.container} onSubmit={onAdd}>
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
                        onAdd={onAdd}
                        onMinus={onMinus}
                        onDelete={onDelete}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />
                    <ProductCartIcon qty={inputValue} />
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
