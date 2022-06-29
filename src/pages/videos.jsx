import React from "react";
import Layout from "../components/Layout";
import ContentGrid from "../components/ContentGrid";
import * as styles from "../scss/hero.module.scss";
import Seo from "../components/Seo";

function Videos() {
    return (
        <Layout pageId="videos">
            <Seo title="Videos" />
            <section className={styles.heroContainer}>
                <h2>
                    All the videos we've done for your benefit in one place.
                </h2>
                <p>
                    Our core teaching medium is video. It's more personable,
                    easier to convey emotion, and allows for a finer level of
                    detail with respect to instructions.
                </p>
            </section>
            <main>
                <ContentGrid pageId="videos" />
            </main>
        </Layout>
    );
}

export default Videos;
