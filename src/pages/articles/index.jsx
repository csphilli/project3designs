import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styling/hero.module.css";

function Articles() {
    return (
        <div>
            <Layout page="articles">
                <main className={styles.heroText}>
                    <h2>
                        From articles about the humble hammer all the way to the
                        DIY tasks, you can find what you need here
                    </h2>
                    <p>This is a test</p>
                </main>
            </Layout>
        </div>
    );
}

export default Articles;
