import React, { useEffect, useContext } from "react";
import SelectField from "./SelectField";
import NumberInput from "./NumberInput";
import * as styles from "../../scss/formElements/productForm.module.scss";
import { formattedPrice } from "../../lib";
import { Link } from "gatsby";
import { ProjectContext } from "../../lib/ProjectContext";

const TEXT = {
    ADD_TO_CART: "Add to Cart",
    SOLD_OUT: "Sold Out",
    CHECKOUT: "Checkout",
};

function ProductForm(props) {
    const { products, style } = props;

    console.log(products);

    const {
        selection,
        setSelection,
        setInputValue,
        showCheckout,
        setShowCheckout,
        onAdd,
    } = useContext(ProjectContext);

    useEffect(() => {
        setSelection(products[0]);
        setInputValue(products[0].quantity);
        setShowCheckout(products[0].quantity > 0 ? true : false);
    }, [setInputValue, setSelection, setShowCheckout]);

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setShowCheckout(item.quantity > 0 ? true : false);
        setInputValue(item.quantity);
        setSelection(item);
    };

    if (selection) {
        return (
            <form className={styles.form_container} onSubmit={onAdd}>
                <p className={styles.price}>
                    {formattedPrice(selection.price)}
                </p>
                <p className={styles.inventory}>
                    <em>Inventory: {selection.maxQty}</em>
                </p>
                <SelectField
                    html_for="product"
                    name="product_id"
                    options={products}
                    handler={handleChange}
                />
                {showCheckout ? (
                    <>
                        <NumberInput
                            html_for="quantity"
                            product={selection}
                            style={style}
                        />
                        <Link to="/cart">
                            <button className={styles.form_btn}>
                                {TEXT.CHECKOUT}
                            </button>
                        </Link>
                    </>
                ) : selection.maxQty > 0 ? (
                    <button className={styles.form_btn} type="submit">
                        {TEXT.ADD_TO_CART}
                    </button>
                ) : (
                    <p className={styles.sold_out_text}>
                        <em>{TEXT.SOLD_OUT}</em>
                    </p>
                )}
            </form>
        );
    } else return null;
}

export default ProductForm;
