import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import ContentGrid from "../../components/ContentGrid";
import * as styles from "../../scss/hero.module.scss";

function Projects() {
    return (
        <HeadPageLayout pageId="projects">
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
        </HeadPageLayout>
    );
}

export default Projects;
