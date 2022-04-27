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
                <p>
                    Practice makes perfect, or at the very least, develops your
                    confidence in tackling things on your own. So take on one of
                    these great projects and when you're done, sit back and take
                    pride in having done it yourself!
                </p>
            </main>
        </Layout>
    );
}

export default Projects;
