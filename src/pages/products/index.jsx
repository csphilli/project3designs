import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";
import { supabase } from "../../lib/supabase";
// import { get_inventory } from "../../lib/get_inventory";

function Products() {
    const [products, setProducts] = useState([]);
    let [btnClick, setBtnClick] = useState(0);
    const [inventory, setInventory] = useState([]);
    // const supabaseURL = process.env.GATSBY_SUPABASE_URL;
    // const supabaseKey = process.env.GATSBY_SUPABASE_KEY;
    // const supabase = createClient(supabaseURL, supabaseKey);

    // In an event where something goes wrong with the production side of product sales, I need a fast way of removing the ability to buy stuff until I get it sorted out. Set this to false if I don't want to allow selling.
    const allowSelling = true;

    // const query = useStaticQuery(graphql`
    //     query Products {
    //         allStripeProduct(
    //             filter: { active: { eq: true } }
    //             sort: { order: DESC, fields: created }
    //         ) {
    //             nodes {
    //                 default_price
    //                 description
    //                 id
    //                 metadata {
    //                     p3d_id
    //                     slug
    //                     max_qty
    //                     product_type
    //                 }
    //                 name
    //                 localFiles {
    //                     childImageSharp {
    //                         gatsbyImageData(aspectRatio: 1.6)
    //                     }
    //                 }
    //             }
    //         }
    //         allStripePrice {
    //             nodes {
    //                 id
    //                 unit_amount
    //                 currency
    //                 product {
    //                     id
    //                 }
    //             }
    //         }
    //     }
    // `);

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

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
            product.quantity < parseInt(product.max_qty) &&
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

    // Will be a switch case statement later
    // const sortProducts = (products) => {
    //     products.forEach((obj) => {
    //         obj.product_list.sort((b, a) => b.price - a.price);
    //     });
    // };

    const assignInventory = (prod) => {
        const exist = inventory.find((item) => item.product_id === prod.id);
        if (exist) {
            return exist.inventory;
        } else {
            return 1;
        }
    };

    // Helper function to create product obljects and then add custom properties.

    const createProdObj = (obj) => {
        return {
            ...obj,
            quantity: 0,
            price: (Number(obj.unit_amount) / 100).toFixed(2),
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

    // useEffect(() => {
    //     // const data = get_inventory();
    //     async function get_inventory() {
    //         try {
    //             const { data: p3d_inventory } = await supabase
    //                 .from("p3d_inventory")
    //                 .select("*");
    //             setInventory(p3d_inventory);
    //         } catch (e) {
    //             console.error("ERROR:", e);
    //         }
    //     }
    //     get_inventory();
    // }, []);

    // console.log("inventor", inventory);

    // useEffect(() => {
    //     // setInventory(get_inventory());
    //     console.log(get_inventory());
    // }, []);

    // Loads in the products from the graphql query. Calls the sort algorithm, and then updates the quantities of the products from the localStorage to repopulate the shopping cart. Finally it sets the products state.

    const fetchProducts = async () => {
        const products = await fetch(`/.netlify/functions/get_products`, {
            method: "GET",
            "Content-type": "application/json",
        }).then((resp) => resp.json());

        return products;
    };

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
            setProducts(prodList);
        });

        // updateFromLocal(products);
    }, []);
    if (allowSelling === true) {
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
    } else {
        return (
            <div>
                <HeadPageLayout pageId="products">
                    <h3>
                        Unfortunately we have temporarily restricted the sales
                        of our products. We apologize for the inconvenience
                        Please come back at a later time to check the status.
                    </h3>
                </HeadPageLayout>
            </div>
        );
    }
}

export default Products;
