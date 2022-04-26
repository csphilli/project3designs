import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styling/hero.module.css";

function Videos() {
    return (
        <Layout page="videos">
            <main className={styles.heroText}>
                <h2>
                    Do you learn better from watching? Then we’ve got you
                    covered!
                </h2>
                <p>
                    We love videos. It's our favorite medium to teach you with
                    because it creates that personal touch that can't be
                    received from reading an article.
                </p>
            </main>
        </Layout>
    );
}

export default Videos;
