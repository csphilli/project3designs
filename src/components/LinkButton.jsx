import { navigate } from "gatsby";
import * as styles from "../scss/linkButton.module.scss";
import React from "react";

function LinkButton({ data }) {
    return (
        <button
            role="link"
            className={styles.btn}
            onClick={() => navigate(`${data.link}`)}
        >
            {data.text}
        </button>
    );
}

export default LinkButton;
