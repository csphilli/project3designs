import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";

function Products() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const query = useStaticQuery(graphql`
        query Products {
            allStripeProduct(
                filter: { active: { eq: true } }
                sort: { order: DESC, fields: created }
            ) {
                nodes {
                    default_price
                    id
                    metadata {
                        p3d_id
                        slug
                    }
                    name
                    localFiles {
                        childImageSharp {
                            gatsbyImageData(aspectRatio: 1.6)
                        }
                    }
                }
            }
            allStripePrice {
                nodes {
                    id
                    unit_amount
                }
            }
        }
    `);
    useEffect(() => {
        const { allStripeProduct: productList, allStripePrice: prices } = query;
        productList.nodes.forEach((obj) => {
            obj.price =
                prices.nodes.find((item) => item.id === obj.default_price)
                    .unit_amount / 100;
        });
        setProducts(productList.nodes);
    }, []);
    return (
        <div>
            <HeadPageLayout pageId="products">
                <div className={styles.container_grid}>
                    <aside className={styles.cart}>
                        <Cart />
                    </aside>
                    <main className={styles.products}>
                        {products.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </main>
                </div>
            </HeadPageLayout>
        </div>
    );
}

export default Products;
