import React, { useEffect, useContext, useState } from "react";
import SelectField from "./SelectField";
import * as styles from "../../scss/formElements/productForm.module.scss";
import { formattedPrice } from "../../lib";
import { Link } from "gatsby";
import QtyButton from "./QtyButton";
import { ProductContext } from "../providers/ProductProvider";
import LoadingSpinner from "../LoadingSpinner";
import { CartContext } from "../providers/CartProvider";
import { CgInfinity } from "react-icons/cg";

const TEXT = {
    ADD_TO_CART: "Add to Cart",
    SOLD_OUT: "Sold Out",
    CHECKOUT: "View Cart",
    DIGITAL: "txcd_10302000",
};

function ProductForm(props) {
    const { p3_id } = props;
    const { products: cProducts } = useContext(ProductContext);
    const { cartItems, onAdd } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [selection, setSelection] = useState(null);
    const filterProducts = () => {
        let list = cProducts
            .filter((item) => item.p3_id === p3_id)
            .map((item) => {
                const exists = cartItems?.find(
                    (obj) => obj.product_id === item.product_id
                );
                if (exists) {
                    return { ...item, quantity: exists.quantity };
                } else return item;
            });
        setProducts(list);
        setSelection(list[0]);
        setLoading(false);
    };

    useEffect(() => {
        filterProducts();
    }, [cProducts]);

    const handleChange = (e) => {
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        setSelection(item);
    };

    const addToCart = (e) => {
        e.preventDefault();
        if (selection.quantity + 1 <= selection.sale_limit) {
            onAdd(selection);
            selection.quantity += 1;
        }
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
                {selection.quantity > 0 ? (
                    <>
                        <div className={styles.input_container}>
                            <QtyButton
                                product={selection}
                                src="project"
                                html_for="quantity"
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
