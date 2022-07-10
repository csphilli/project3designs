import React from "react";
import * as styles from "../../scss/nav/menuToggle.module.scss";

function MenuToggle() {
    return (
        <div className={styles.menu_toggle}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default MenuToggle;
