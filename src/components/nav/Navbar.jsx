import React, { useContext, useState } from "react";
import { Link } from "gatsby";
import * as styles from "../../scss/nav/navbar.module.scss";
import { graphql, useStaticQuery } from "gatsby";
import { BsCart } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import NavLogo from "./NavLogo";
import { ProjectContext } from "../../lib/ProjectContext";
import MobileNavMenu from "./MobileNavMenu";

function Navbar({ path }) {
    const { cartQty } = useContext(ProjectContext);
    const [toggleNav, setToggleNav] = useState(false);

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
        <nav className={styles.navBar}>
            <Link className={styles.logoText} to="/">
                <h1>
                    <NavLogo />
                </h1>
            </Link>
            <HiOutlineMenu
                className={styles.menu_icon}
                onClick={() => setToggleNav((prevState) => !prevState)}
            />
            {toggleNav && (
                <MobileNavMenu links={links} setToggleNav={setToggleNav} />
            )}
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
