import React from "react";
import Layout from "../components/Layout";
import LearnMore from "../components/LearnMore";
import Seo from "../components/Seo";
import * as styles from "../scss/hero.module.scss";

export default function Home() {
    return (
        <div>
            <Layout pageId="home">
                <Seo title="Home" />
                <section className={styles.heroContainer}>
                    <h2>
                        Have you seen something amazing made by someone else,
                        thought about buying it, but then were met with sticker
                        shock?
                    </h2>
                    <p>
                        Avoid that feeling of despair by taking matters into
                        your own hands!
                    </p>
                </section>
                {/* <LearnMore /> */}
            </Layout>
        </div>
    );
}
