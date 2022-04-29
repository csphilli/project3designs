import React from "react";
import * as styles from "../styling/hero.module.css";

function HeroSection({ pageData }) {
    return (
        <section className={styles.heroContainer}>
            <h2>{pageData.frontmatter.hero_h2}</h2>
            <p>{pageData.frontmatter.hero_p}</p>
        </section>
    );
}

export default HeroSection;
