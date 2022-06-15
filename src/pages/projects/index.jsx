import React from "react";
import Layout from "../../components/Layout";
import ContentGrid from "../../components/ContentGrid";
import * as styles from "../../scss/hero.module.scss";
import Seo from "../../components/Seo";

function Projects() {
    return (
        <Layout pageId="projects">
            <Seo title="Projects" />
            <section className={styles.heroContainer}>
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
            </section>
            <main>
                <ContentGrid pageId="projects" />
            </main>
        </Layout>
    );
}

export default Projects;
