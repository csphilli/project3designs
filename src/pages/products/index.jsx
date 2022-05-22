import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";

function Products() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

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
                        max_qty
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
                    currency
                }
            }
        }
    `);

    const formattedPrice = (value, ccy = "eur") => {
        return Intl.NumberFormat("en-EU", {
            style: "currency",
            currency: ccy,
        }).format(value);
    };

    const isClickAllowed = (quantity, product) => {
        return quantity < parseInt(product.metadata.max_qty);
    };

    const onAdd = (product) => {
        const exist = cartItems.find((obj) => product.id === obj.id);
        if (exist) {
            setCartItems(
                cartItems.map((obj) =>
                    obj.id === product.id &&
                    obj.quantity < product.metadata.max_qty
                        ? {
                              ...exist,
                              quantity: (exist.quantity += 1),
                              clickAllowed: isClickAllowed(
                                  exist.quantity,
                                  product
                              ),
                          }
                        : obj
                )
            );
        } else {
            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1,
                    clickAllowed: isClickAllowed(1, product),
                },
            ]);
        }
    };

    const onMinus = (product) => {
        const exist = cartItems.find((obj) => product.id === obj.id);
        if (exist && exist.quantity === 1) {
            setCartItems(cartItems.filter((obj) => obj.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((obj) =>
                    obj.id === product.id
                        ? {
                              ...exist,
                              quantity: (exist.quantity -= 1),
                              clickAllowed: isClickAllowed(
                                  exist.quantity,
                                  product
                              ),
                          }
                        : obj
                )
            );
        }
    };

    useEffect(() => {
        const { allStripeProduct: productList, allStripePrice: prices } = query;        
        productList.nodes.forEach((obj) => {
            obj.price =
                prices.nodes.find((item) => item.id === obj.default_price)
                    .unit_amount / 100;
            obj.quantity = 0;
            obj.clickAllowed = true;
            obj.currency = prices.nodes.find(
                (item) => item.id === obj.default_price
            ).currency;
        });
        setProducts(productList.nodes);
    }, [query]);
    return (
        <div>
            <HeadPageLayout pageId="products">
                <div className={styles.container_grid}>
                    <aside className={styles.cart}>
                        <Cart
                            formattedPrice={formattedPrice}
                            onMinus={onMinus}
                            onAdd={onAdd}
                            setCartItems={setCartItems}
                            cartItems={cartItems}
                        />
                    </aside>
                    <main className={styles.products}>
                        {products.map((product) => (
                            <ProductCard
                                formattedPrice={formattedPrice}
                                cartItems={cartItems}
                                onMinus={onMinus}
                                onAdd={onAdd}
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </main>
                </div>
            </HeadPageLayout>
        </div>
    );
}

export default Products;
