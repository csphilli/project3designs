import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styling/hero.module.css";

function About() {
    return (
        <div>
            <Layout page="about">
                <main className={styles.heroText}>
                    <h2>Interested in learning more about us?</h2>
                    <p>Well then you've come to the right place.</p>
                </main>
            </Layout>
        </div>
    );
}

export default About;
