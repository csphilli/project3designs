import React, { useContext } from "react";
import Layout from "../../components/Layout";
import ContentGrid from "../../components/ContentGrid";
import * as styles from "../../scss/hero.module.scss";
import Seo from "../../components/Seo";
import { UserContext } from "../../lib/UserContext";

function Projects() {
    // const { setUser } = useContext(UserContext);
    const msg = useContext(UserContext);

    console.log(msg);

    return (
        <Layout pageId="projects">
            <Seo title="Projects" />
            <section className={styles.heroContainer}>
                {/* <button
                    onClick={async () => {
                        setUser({ name: "Chris" });
                    }}
                >
                    login
                </button> */}
                <h2>
                    {/* {msg && msg} */}
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
