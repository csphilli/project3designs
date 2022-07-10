import React, { useContext } from "react";
import { ProjectContext } from "../../lib/ProjectContext";
import { Link } from "gatsby";
import { BsCart } from "react-icons/bs";
import * as styles from "../../scss/nav/mobileNav.module.scss";

function MobileNavMenu(props) {
    const { cartQty } = useContext(ProjectContext);
    const { links, setToggleNav } = props;

    return (
        <nav role="navigation" className={styles.mobileNav_container}>
            <button
                className={styles.close_nav}
                onClick={() => setToggleNav((prev) => !prev)}
            >
                X
            </button>
            <div className={styles.links}>
                {links.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setToggleNav(false)}
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

export default MobileNavMenu;
