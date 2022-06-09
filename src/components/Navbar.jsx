import React from "react";
import { Link } from "gatsby";
import * as styles from "../scss/navbar.module.scss";
import { NavData } from "./NavData";
import { BsCart } from "react-icons/bs";

function Navbar({ pageId }) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.navLeft}>
                <Link className={styles.logoText} to="/">
                    <h1>Awesome(sauce)</h1>
                </Link>
            </div>

            {/* <h1 className={styles.logoText}>Awesome(sauce)</h1> */}
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
                    LOGIN
                    <Link
                        className={pageId === "cart" ? styles.active : "none"}
                        to="/cart"
                    >
                        <BsCart />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
