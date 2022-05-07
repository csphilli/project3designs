import React from "react";
import * as styles from "../scss/card.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function Card({ props }) {
    const image = getImage(props.post_thumb.childImageSharp.gatsbyImageData);
    return (
        <div className={styles.card}>
            <GatsbyImage image={image} alt="alt image text" />
            <h3 className={styles.title}>{props.title_snippet}</h3>
        </div>
    );
}

// post_thumb {
// 	childImageSharp {
// 		gatsbyImageData
// 	}
// }

export default Card;
