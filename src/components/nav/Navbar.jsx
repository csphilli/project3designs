import React, { useContext, useState } from "react";
import { Link } from "gatsby";
import * as styles from "../../scss/nav/navbar.module.scss";
import { graphql, useStaticQuery } from "gatsby";
import { BsCart } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { HiOutlineMenu } from "react-icons/hi";
import NavLogo from "./NavLogo";
import { ProjectContext } from "../../lib/ProjectContext";

function Navbar({ path }) {
    const { cartQty } = useContext(ProjectContext);
    const [showNav, setShowNav] = useState(false);

    const handleMenuClick = () => {
        setShowNav((prevState) => !prevState);
    };

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
    return (
        <nav role="navigation" className={styles.navBar}>
            <header>
                <Link
                    className={styles.logoText}
                    to="/"
                    aria-current="Home page"
                    aria-label="home page"
                >
                    <h1>
                        <NavLogo />
                    </h1>
                </Link>
            </header>
            <button
                onClick={handleMenuClick}
                className={styles.menu_button}
                aria-label="Show or hide mobile navigation menu"
            >
                {showNav ? (
                    <CgClose className={styles.menu_icon} />
                ) : (
                    <HiOutlineMenu className={styles.menu_icon} />
                )}
            </button>
            <div
                className={
                    showNav
                        ? styles.links
                        : ` ${styles.links_inactive} ${styles.links}`
                }
            >
                {links.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            className={
                                path === `${item.path}/` ? styles.active : null
                            }
                            to={item.path}
                            onClick={handleMenuClick}
                        >
                            {item.id === "cart" ? (
                                <div className={styles.cart_icon_container}>
                                    <BsCart />
                                    <span className={styles.qty}>
                                        {cartQty > 0 ? cartQty : null}
                                    </span>
                                </div>
                            ) : (
                                item.id
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navbar;
