import { Link } from "gatsby";
import * as styles from "../scss/button.module.scss";
import React from "react";

function Button() {
    return (
        <div className={styles.btnContainer}>
            <Link to="learn-more" className={styles.btn}>
                Learn More
            </Link>
        </div>
    );
}

export default Button;
