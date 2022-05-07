import React from "react";
import * as styles from "../scss/LearnMoreLi.module.scss";

function LearnMoreLi({ data, index }) {
    return (
        <div className={styles.item_container}>
            <li className={styles.list_item}>{data.list[index]}</li>
        </div>
    );
}

export default LearnMoreLi;
