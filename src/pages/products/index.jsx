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
                    description
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
                    product {
                        id
                    }
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
        // console.log(quantity, "vs", parseInt(product.metadata.max_qty));

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

    const sortProducts = (products) => {
        products.forEach((obj) => {
            obj.product_list.sort((b, a) => b.price - a.price);
        });
    };

    const createProdObj = (product, unit_amt, ccy) => {
        return {
            ...product,
            quantity: 0,
            clickAllowed: true,
            price: (Number(unit_amt) / 100).toFixed(2),
            currency: ccy,
            // product_id: `${product.metadata.p3d_id}-${product.description}`,
        };
    };

    useEffect(() => {
        const { allStripeProduct: productList, allStripePrice: prices } = query;
        let products = [];
        productList.nodes.forEach((obj) => {
            const exist = products.find(
                (arr) => arr.p3d_id === obj.metadata.p3d_id
            );
            const { currency, unit_amount } = prices.nodes.find(
                (item) => item.id === obj.default_price
            );
            if (exist) {
                exist.product_list.push(
                    createProdObj(obj, unit_amount, currency)
                );
            } else {
                products.push({
                    p3d_id: obj.metadata.p3d_id,
                    product_list: new Array(
                        createProdObj(obj, unit_amount, currency)
                    ),
                });
            }
        });
        sortProducts(products);
        setProducts(products);
        console.log(products);
    }, [query]);
    return (
        <div>
            <HeadPageLayout pageId="products">
                <div className={styles.container_grid}>
                    <aside className={styles.cart}>
                        {/* cart */}
                        <Cart
                            formattedPrice={formattedPrice}
                            onMinus={onMinus}
                            onAdd={onAdd}
                            setCartItems={setCartItems}
                            cartItems={cartItems}
                        />
                    </aside>
                    <main className={styles.products}>
                        {/* product card */}
                        {products.map((product) => (
                            <ProductCard
                                formattedPrice={formattedPrice}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                onMinus={onMinus}
                                onAdd={onAdd}
                                // key={product.id}
                                // product={product}
                                key={product.product_list[0].id}
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
