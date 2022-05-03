import React from "react";
import Layout from "../components/Layout";
import * as styles from "../scss/project-details.module.scss";

function ProjectDetails() {
    return (
        <Layout>
            <div className={styles.project_banner_container}>
                <div>image</div>
                <h3>Hello</h3>
                <p>date</p>
                <div className={styles.article_info_container}>
                    <div className={styles.author_container}>
                        <div className={styles.author_img}>author img</div>
                        <div className={styles.author_details}>
                            <h5>Christopher PHillips</h5>
                            <p>CEO Project3 Studio</p>
                        </div>
                    </div>
                    <div className={styles.share_icons_container}>
                        <p className={styles.fbook_icon}>icon facebook</p>
                        <p className={styles.twitter_icon}>icon twitter</p>
                    </div>
                </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.article_container}>
                <div dangerouslySetInnerHTML="Testing" />
            </div>
        </Layout>
    );
}

export default ProjectDetails;
