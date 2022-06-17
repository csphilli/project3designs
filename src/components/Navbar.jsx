import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import * as styles from "../scss/navbar.module.scss";
import { BsCart } from "react-icons/bs";
// import { OrderItemsContext } from "./Layout";

/* TODO

1) Create styling on the cart qty value as an attribute passed to CSS.
2) Take nav pages from gatsy.config site metadata

*/

function Navbar({ pageId }) {
    // const { order } = useContext(OrderItemsContext);
    // const [orderItems] = order;

    // const qty = orderItems
    //     .filter((item) => item.qty > 0)
    //     .reduce((acc, i) => acc + i.qty, 0);

    return (
        <nav className={styles.navBar}>
            <div className={styles.navLeft}>
                <Link className={styles.logoText} to="/">
                    <h1>Awesome(sauce)</h1>
                </Link>
            </div>
            <div className={styles.navRight}>
                <div className={styles.links}>
                    {/* {NavData.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                className={
                                    pageId === item.name
                                        ? styles.active
                                        : "none"
                                }
                                to={item.link}
                            >
                                {item.name}
                            </Link>
                        );
                    })} */}
                    <Link
                        className={
                            pageId === "projects" ? styles.active : "none"
                        }
                        to="/projects"
                    >
                        projects
                    </Link>
                    <Link
                        className={pageId === "videos" ? styles.active : "none"}
                        to="/videos"
                    >
                        videos
                    </Link>
                    <Link
                        className={
                            pageId === "products" ? styles.active : "none"
                        }
                        to="/products"
                    >
                        products
                    </Link>
                    <Link
                        className={pageId === "cart" ? styles.active : "none"}
                        to="/cart"
                    >
                        {/* OrderItems: {qty} */}
                        <BsCart />
                    </Link>
                    LOGIN
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
