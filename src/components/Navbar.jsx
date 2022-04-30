import React from "react";
import { Link } from "gatsby";
import * as styles from "../scss/nav.module.scss";
import { NavData } from "./NavData";

function Navbar({ pageId }) {
    return (
        <nav className={styles.navBar}>
            <h1>Project3 Studio</h1>
            <div className={styles.links}>
                {NavData.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            className={
                                pageId === item.name ? styles.active : "none"
                            }
                            to={item.link}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navbar;
