import React from "react";
import * as styles from "../../scss/listElements/iconBulletList.module.scss";

function IconBulletList(props) {
    const { icon, text } = props;
    return (
        <div className={styles.bulletContainer}>
            <div className={styles.icon}>{icon}</div>
            <p className={styles.text}>{text}</p>
        </div>
    );
}

export default IconBulletList;
