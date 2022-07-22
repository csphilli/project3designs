import React, { useState, useEffect, useContext } from "react";
import { formattedPrice } from "../lib/index";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import * as styles from "../scss/products.module.scss";
import { Link } from "gatsby";
import { ProductContext } from "../components/providers/ProductProvider";

function Products() {
    const { products: cProducts } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const allowSelling = true;

    const sorting = (products, column, order = "asc") => {
        if (order === "asc") {
            products.forEach((obj) => {
                obj.product_list.sort(
                    (b, a) => b[`${column}`] - a[`${column}`]
                );
            });
        } else if (order === "des") {
            products.forEach((obj) => {
                obj.product_list.sort(
                    (b, a) => a[`${column}`] - b[`${column}`]
                );
            });
        } else {
            console.error(`Sorting by '${order}' is not supported.`);
        }
    };

    useEffect(() => {
        let list = [];
        cProducts?.forEach((item) => {
            const exists = list.find((obj) => obj.p3_id === item.p3_id);
            if (exists) {
                exists.product_list.push(item);
            } else
                list.push({
                    p3_id: item.p3_id,
                    product_list: new Array(item),
                });
        });
        sorting(list, "price");
        setProducts(list);
        setLoading(false);
    }, [cProducts]);

    if (allowSelling === true) {
        return (
            <main>
                <Seo title="Products" />
                {loading ? (
                    <div className={styles.loading_container}>
                        <LoadingSpinner type="products" />
                    </div>
                ) : (
                    <section className={styles.products}>
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
                    </section>
                )}
            </main>
        );
    } else {
        return (
            <main>
                <Seo title="Products" description="Sales suspended" />
                <h3>
                    Unfortunately we have temporarily restricted the sales of
                    our products. We apologize for the inconvenience. Please
                    come back at a later time to check the status.
                </h3>
            </main>
        );
    }
}

export default Products;
