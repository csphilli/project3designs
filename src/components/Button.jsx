import { Link } from "gatsby";
import * as styles from "../scss/button.module.scss";
import React from "react";

function Button({ data }) {
    return (
        <div className={styles.btnContainer}>
            <Link to={data.link} className={styles.btn}>
                {data.text}
            </Link>
        </div>
    );
}

export default Button;
