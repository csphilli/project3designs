import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import * as styles from "../scss/hero.module.scss";

function About() {
    return (
        <div>
            <Layout pageId="about">
                <Seo title="About" />
                <section className={styles.heroContainer}>
                    <h2>Here's the TLDR</h2>
                    <p>
                        Grew up in rural Wisconsin, moved to NYC in 2008 to
                        pursue finance, had three sons, two of which required
                        medical care of which I could only afford to get in
                        Finland since they are dual citizens. Moved there,
                        bought a summer cottage. Built a sauna, storage shed,
                        out-house, terrace, and fence to name a few. Had to sell
                        it but have been passionate about DIY ever since. I want
                        to teach what I've learned over a decade's worth of
                        time.
                    </p>
                </section>
            </Layout>
        </div>
    );
}

export default About;
