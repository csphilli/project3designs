import React from "react";
import { Link } from "gatsby";
import * as styles from "../../scss/nav/navbar.module.scss";
import { graphql, useStaticQuery } from "gatsby";
import { BsCart } from "react-icons/bs";
import NavLogo from "./NavLogo";

// import { OrderItemsContext } from "./Layout";

/* TODO

1) Create styling on the cart qty value as an attribute passed to CSS.
2) Take nav pages from gatsy.config site metadata
3) If user logged in, have "Hi, <name>" and if clicked, takes to member page

*/

function Navbar({ path }) {
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

    const links = [...site.siteMetadata.navLinks];

    // console.log(`links: ${links}`);

    // const { order } = useContext(OrderItemsContext);
    // const [orderItems] = order;

    // const qty = orderItems
    //     .filter((item) => item.qty > 0)
    //     .reduce((acc, i) => acc + i.qty, 0);

    return (
        <nav className={styles.navBar}>
            <Link className={styles.logoText} to="/">
                <h1>
                    <NavLogo />
                </h1>
            </Link>
            <div className={styles.links}>
                {links.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            className={
                                path === `${item.path}/`
                                    ? styles.active
                                    : "none"
                            }
                            to={item.path}
                        >
                            {item.id === "cart" ? <BsCart /> : item.id}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navbar;
