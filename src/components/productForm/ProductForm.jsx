import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import * as styles from "../../scss/formElements/productForm.module.scss";
import { formattedPrice } from "../../lib";
import { Link } from "gatsby";
import QtyButton from "./QtyButton";
import LoadingSpinner from "../LoadingSpinner";
import { useCartContext } from "../providers/CartProvider";
import { CgInfinity } from "react-icons/cg";

const TEXT = {
    ADD_TO_CART: "Add to Cart",
    SOLD_OUT: "Sold Out",
    CHECKOUT: "View Cart",
    DIGITAL: "txcd_10302000",
};

function ProductForm(props) {
    const { products } = props;
    const { cartItems, onAdd } = useCartContext();
    const [loading, setLoading] = useState(true);
    const [selection, setSelection] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setSelection(products[0]);
        setLoading(false);
    }, [products]);

    useEffect(() => {
        setValue(
            cartItems?.find((item) => item.product_id === selection.product_id)
                ?.quantity
        );
    }, [selection, cartItems]);

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setSelection(item);
    };

    const addToCart = (e) => {
        e.preventDefault();
        onAdd(selection);
    };

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <LoadingSpinner type="products" />
            </div>
        );
    } else if (selection) {
        return (
            <form className={styles.form_container} onSubmit={addToCart}>
                <div className={styles.heading_container}>
                    <p className={styles.price}>
                        {formattedPrice(selection.price)}
                    </p>
                    <div className={styles.inventory_container}>
                        <p>Inventory: </p>
                        {selection.tax_code === TEXT.DIGITAL ? (
                            <CgInfinity className={styles.inventory_icon} />
                        ) : (
                            <p>{selection.sale_limit}</p>
                        )}
                    </div>
                </div>
                <div className={styles.input_container}>
                    <SelectField
                        html_for="product"
                        name="product_id"
                        options={products}
                        handler={handleChange}
                    />
                </div>
                {value > 0 ? (
                    <>
                        <div className={styles.input_container}>
                            <QtyButton
                                product={selection}
                                src="project"
                                html_for="quantity"
                                value={value}
                                setValue={setValue}
                            />
                        </div>
                        <Link to="/cart">
                            <button className={styles.form_btn}>
                                {TEXT.CHECKOUT}
                            </button>
                        </Link>
                    </>
                ) : selection.sale_limit > 0 ? (
                    <button
                        className={styles.form_btn}
                        type="submit"
                        aria-label="Add to cart"
                    >
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
