import React, { useEffect, useState } from "react";
import * as styles from "../scss/productList.module.scss";
import ProductCard from "./ProductCard";

function ProductsList() {
    const url = process.env.GATSBY_STRIPE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((obj) => setProducts(obj));
    }, []);
    return (
        <div className={styles.product_grid_container}>
            {products && products.map((item) => <ProductCard data={item} />)}
        </div>
    );
}

export default ProductsList;
