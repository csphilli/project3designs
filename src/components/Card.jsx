import React from "react";
import * as styles from "../scss/card.module.scss";

function Card({ props }) {
    console.log("props", props.title);
    return (
        <div className={styles.card}>
            <h3>{props.title}</h3>
        </div>
    );
}

export default Card;
