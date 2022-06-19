import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import * as styles from "../scss/navbar.module.scss";
import { graphql, useStaticQuery } from "gatsby";
import { BsCart } from "react-icons/bs";
import NavLogo from "./NavLogo";

// import { OrderItemsContext } from "./Layout";

/* TODO

1) Create styling on the cart qty value as an attribute passed to CSS.
2) Take nav pages from gatsy.config site metadata
3) If user logged in, have "Hi, <name>" and if clicked, takes to member page

*/

function Navbar({ pageId }) {
    const { site } = useStaticQuery(graphql`
        query navLinkQuery {
            site {
                siteMetadata {
                    siteName
                    navLinks {
                        id
                        path
                    }
                }
            }
        }
    `);

    const siteName = site.siteMetadata.siteName;
    const links = [...site.siteMetadata.navLinks];

    // console.log(`links: ${links}`);

    // const { order } = useContext(OrderItemsContext);
    // const [orderItems] = order;

    // const qty = orderItems
    //     .filter((item) => item.qty > 0)
    //     .reduce((acc, i) => acc + i.qty, 0);

    return (
        <nav className={styles.navBar}>
            <div className={styles.navLeft}>
                <Link className={styles.logoText} to="/">
                    <h1>
                        <NavLogo />
                    </h1>
                </Link>
            </div>
            <div className={styles.navRight}>
                <div className={styles.links}>
                    {links.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                className={
                                    pageId === item.id ? styles.active : "none"
                                }
                                to={item.path}
                            >
                                {item.id === "cart" ? <BsCart /> : item.id}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
