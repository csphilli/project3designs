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
import { Link } from "gatsby";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <main className={styles.products}>
                        {products.map((product) => (
                            <Link
                                to={`/projects/${product.product_list[0].slug}`}
                                key={product.product_list[0].id}
                            >
                                <ProductCard
                                    formattedPrice={formattedPrice}
                                    key={product.product_list[0].id}
                                    product={product}
                                />
                            </Link>
                        ))}
                    </main>
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
