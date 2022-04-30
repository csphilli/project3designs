import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import * as styles from "../scss/nav.module.scss";
import { NavData } from "./NavData";
import { HiMenu } from "react-icons/hi";

function Navbar({ pageId }) {
    // const [navMenu, setNavMenu] = useState(false);

    // const onNavClick = () => {
    //     console.log("nav link clicked");
    //     setNavMenu(!navMenu);
    // };

    return (
        <nav className={styles.navBar}>
            <h1 className={styles.logoText}>Project3 Studio</h1>
            {/* <HiMenu
                onClick={() => setNavMenu(!navMenu)}
                className={styles.navMenuIcon}
            /> */}
            <div
                // className={
                //     navMenu
                //         ? `${styles.navMenu} ${styles.menuActive}`
                //         : styles.navMenu
                // }
                className={`${styles.navBar} ${styles.links}`}
            >
                {NavData.map((item, index) => {
                    return (
                        <Link
                            // onClick={() => onNavClick()}
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
