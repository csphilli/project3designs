import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";

function Products() {
    const [products, setProducts] = useState([]);
    let [btnClick, setBtnClick] = useState(0);
    // let [local, setLocal] = useState([]);
    // const [cartItems, setCartItems] = useState([]);

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
                        product_type
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

    // Formats the product pricing. Default is eur.
    const formattedPrice = (value, ccy = "eur") => {
        return Intl.NumberFormat("en-EU", {
            style: "currency",
            currency: ccy,
            maximumSignificantDigits: 5, // might have an issue with numbers
        }).format(value);
    };

    // Cart items are populated based on product quantities. Since useEffect can't monitor changes in array child elements, I have to use a button click state to monitor changes. Each time any button (onAdd, onMinus, emptyCart) fires, it updates the products and triggers a refresh of the cart list.
    const handleClick = () => {
        setBtnClick((_btnClick) => _btnClick + 1);
    };

    // Used to check if buttons can be clicked.
    const isClickAllowed = (product) => {
        return (
            product.quantity < parseInt(product.metadata.max_qty) &&
            product.inventory >= 1
        );
    };

    // Saves a key and value pair to local storage. Will update the quantity
    const saveToLocal = () => {
        let local = [];
        products.forEach((list) =>
            list.product_list.forEach((prod) => {
                local.push({ key: prod.id, value: prod });
            })
        );
        localStorage.setItem("cartItems", JSON.stringify(local));
    };

    // Updates the quantities that were saved to the local storage for repopulating the cart contents if a user leaves the page before checking out.
    const updateFromLocal = (products) => {
        const local = JSON.parse(localStorage.getItem("cartItems"));
        if (local) {
            products.forEach((list) => {
                list.product_list.forEach((item) => {
                    const prod = local.find((prod) => prod.key === item.id);
                    if (prod) {
                        item.quantity = prod.value.quantity;
                    }
                });
            });
        }
    };

    // Simple function to handle adding items to cart.
    const onAdd = (item) => {
        if (isClickAllowed(item) === true) {
            item.quantity++;
            saveToLocal(item.id, item);
        }
    };

    // Simple function to handle removing items from cart.
    const onMinus = (item) => {
        if (item.quantity >= 1) {
            item.quantity--;
            saveToLocal(item.id, item);
        }
    };

    const sortProducts = (products) => {
        products.forEach((obj) => {
            obj.product_list.sort((b, a) => b.price - a.price);
        });
    };

    // Helper function to create product obljects and then add custom properties.
    const createProdObj = (product, unit_amt, ccy) => {
        return {
            ...product,
            quantity: 0,
            // clickAllowed: true,
            price: (Number(unit_amt) / 100).toFixed(2),
            currency: ccy,
            inventory: 102,
        };
    };

    // As it says. The cart is populated by products with quantity props > 0. To empty the cart, all those are set back to 0, clickAllowed toggled to true and the localStorage is removed. clickAllowed is a property that the add to cart buttons check whether or not more quantity can be added to the cart. It is vital to have max_qty as metadata in the Stripe dashboard for the specific product.
    const emptyCart = () => {
        products.forEach((obj) => {
            obj.product_list.forEach((prod) => {
                prod.quantity = 0;
                // prod.clickAllowed = true;
            });
        });
        localStorage.removeItem("cartItems");
        handleClick();
    };

    // Loads in the products from the graphql query. Calls the sort algorithm, and then updates the quantities of the products from the localStorage to repopulate the shopping cart. Finally it sets the products state.
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
        updateFromLocal(products);
        setProducts(products);
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
                            products={products}
                            handleClick={handleClick}
                            btnClick={btnClick}
                            emptyCart={emptyCart}
                        />
                    </aside>
                    <main className={styles.products}>
                        {products.map((product) => (
                            <ProductCard
                                formattedPrice={formattedPrice}
                                handleClick={handleClick}
                                btnClick={btnClick}
                                onMinus={onMinus}
                                onAdd={onAdd}
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
