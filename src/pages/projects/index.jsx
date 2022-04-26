import React from "react";
import Layout from "../../components/Layout";
import * as styles from "../../styling/hero.module.css";

function Projects() {
    return (
        <Layout page="projects">
            <main className={styles.heroText}>
                <h2>
                    Every project provides an opportunity for you to hone your
                    DIY skills
                </h2>
                <p>Small paragraph</p>
            </main>
        </Layout>
    );
}

export default Projects;
