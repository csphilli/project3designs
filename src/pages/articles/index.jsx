import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styling/hero.module.css";

function Articles() {
    return (
        <div>
            <Layout pageId="articles">
                <main className={styles.heroText}></main>
            </Layout>
        </div>
    );
}

export default Articles;
