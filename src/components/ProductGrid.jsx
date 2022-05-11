import React, { useState, useEffect } from "react";
import * as styles from "../scss/productGrid.module.scss";
import ProductCard from "./ProductCard";

function ProductGrid() {
    const url = process.env.GATSBY_STRIPE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((obj) => setProducts(obj));
    }, []);
    return (
        <div className={styles.product_grid_container}>
            {products &&
                products.map((item) => (
                    // <ProductCard key={item.id} data={item} />
                    <ProductCard data={item} />
                ))}
        </div>
    );
}

export default ProductGrid;
