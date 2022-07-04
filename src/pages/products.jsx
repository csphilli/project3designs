import React, { useState, useEffect } from "react";
import {
    createProdObj,
    fetchProducts,
    formattedPrice,
    sortProducts,
} from "../lib/index";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import * as styles from "../scss/products.module.scss";

function Products() {
    const [products, setProducts] = useState([]);
    // let [btnClick, setBtnClick] = useState(true);
    // const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cart items are populated based on product quantities. Since useEffect can't monitor changes in array child elements, I have to use a button click state to monitor changes. Each time any button (onAdd, onMinus, emptyCart) fires, it updates the products and triggers a refresh of the cart list.
    // const handleClick = () => {
    //     setBtnClick((_btnClick) => !_btnClick);
    // };

    // As it says. The cart is populated by products with quantity props > 0. To empty the cart, all those are set back to 0, clickAllowed toggled to true and the localStorage is removed. clickAllowed is a property that the add to cart buttons check whether or not more quantity can be added to the cart. It is vital to have max_qty as metadata in the Stripe dashboard for the specific product.
    // const emptyCart = (products) => {
    //     products.forEach((obj) => {
    //         obj.product_list.forEach((prod) => {
    //             prod.quantity = 0;
    //             // prod.clickAllowed = true;
    //         });
    //     });
    //     localStorage.removeItem("cartItems");
    //     handleClick();
    // };

    // In an event where something goes wrong with the production side of product sales, I need a fast way of removing the ability to buy stuff until I get it sorted out. Set this to false if I don't want to allow selling.
    const allowSelling = true;

    useEffect(() => {
        let prodList = [];
        fetchProducts().then((arr) => {
            arr.forEach((item) => {
                const exists = prodList.find(
                    (prod) => prod.p3_id === item.p3_id
                );
                exists
                    ? exists.product_list.push(createProdObj(item))
                    : prodList.push({
                          p3_id: item.p3_id,
                          product_list: new Array(createProdObj(item)),
                      });
            });
            sortProducts(prodList);
            setProducts(prodList);
            setLoading(false);
        });
    }, []);

    if (allowSelling === true) {
        return (
            <div>
                <Seo title="Products" />
                {loading ? (
                    <div className={styles.loading_container}>
                        <LoadingSpinner type="products" />
                    </div>
                ) : (
                    <>
                        <main className={styles.products}>
                            {products.map((product) => (
                                <ProductCard
                                    formattedPrice={formattedPrice}
                                    key={product.product_list[0].id}
                                    product={product}
                                />
                            ))}
                        </main>
                    </>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <h3>
                    Unfortunately we have temporarily restricted the sales of
                    our products. We apologize for the inconvenience Please come
                    back at a later time to check the status.
                </h3>
            </div>
        );
    }
}

export default Products;
