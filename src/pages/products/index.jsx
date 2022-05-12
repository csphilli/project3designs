import React, { useState, useEffect } from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
// import ProductsList from "../../components/ProductsList";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";

function Products() {
    const url = process.env.GATSBY_STRIPE_URL;
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((obj) => setProducts(obj));
    }, []);
    console.log("url", url);
    console.log("products", products);
    return (
        <div>
            <HeadPageLayout pageId="products">
                <div className={styles.container_grid}>
                    <aside className={styles.cart}>
                        <Cart />
                    </aside>
                    <main className={styles.products}>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} data={product} />
                            ))}
                    </main>
                </div>
            </HeadPageLayout>
        </div>
    );
}

export default Products;
