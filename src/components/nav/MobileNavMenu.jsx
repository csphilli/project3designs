import React, { useContext } from "react";
import { ProjectContext } from "../../lib/ProjectContext";
import NavLogo from "./NavLogo";
import { Link } from "gatsby";
import { BsCart } from "react-icons/bs";
import * as styles from "../../scss/nav/navModal.module.scss";

function MobileNavMenu(props) {
    const { cartQty } = useContext(ProjectContext);
    const { links, setToggleNav } = props;
    console.log(links);

    return (
        <nav className={styles.nav_container}>
            <button
                className={styles.close_modal}
                onClick={() => setToggleNav((prev) => !prev)}
            >
                X
            </button>
            <h1>
                <NavLogo />
            </h1>
            {links.map((item, index) => {
                return (
                    <Link key={index} to={item.path}>
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
        </nav>
    );
}

export default MobileNavMenu;
