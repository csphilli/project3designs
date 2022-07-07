import React, { useEffect, useContext } from "react";
import SelectField from "./SelectField";
import * as styles from "../../scss/formElements/productForm.module.scss";
import { formattedPrice } from "../../lib";
import { Link } from "gatsby";
import { ProjectContext } from "../../lib/ProjectContext";
import { saveToLocal } from "../../lib";
import QtyButton from "./QtyButton";

const TEXT = {
    ADD_TO_CART: "Add to Cart",
    SOLD_OUT: "Sold Out",
    CHECKOUT: "Checkout",
};

function ProductForm(props) {
    const { products } = props;

    const {
        selection,
        setSelection,
        showCheckout,
        setShowCheckout,
        setCartQty,
    } = useContext(ProjectContext);

    useEffect(() => {
        setSelection(products[0]);
        setShowCheckout(products[0].quantity > 0 ? true : false);
    }, [setSelection, setShowCheckout]);

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setShowCheckout(item.quantity > 0 ? true : false);
        setSelection(item);
    };

    const addToCart = (e) => {
        e.preventDefault();
        if (selection.quantity + 1 <= selection.maxQty) {
            selection.quantity += 1;
            setCartQty((prev) => prev + 1);
            setShowCheckout(true);
            saveToLocal(selection.product_id, selection);
        }
    };

    if (selection) {
        return (
            <form className={styles.form_container} onSubmit={addToCart}>
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
                        <QtyButton
                            product={selection}
                            src="project"
                            html_for="quantity"
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
