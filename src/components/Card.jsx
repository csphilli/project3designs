import React from "react";
import * as styles from "../scss/card.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function Card({ props }) {
    const image = getImage(props.post_thumb.childImageSharp.gatsbyImageData);

    return (
        <div className={styles.card}>
            <div className={styles.image_container}>
                <GatsbyImage
                    className={styles.image}
                    image={image}
                    alt="alt image text"
                />
            </div>
            <div className={styles.title_container}>
                <div className={styles.upper_wrapper}>
                    <h3 className={styles.title}>{props.title}</h3>
                    <p>{props.post_snippet.substring(0, 125).concat("...")}</p>
                </div>
                <p className={styles.date}>{props.date}</p>
            </div>
        </div>
    );
}

export default Card;
