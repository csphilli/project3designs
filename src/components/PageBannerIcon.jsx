import React from "react";
import * as styles from "../styling/pageIcon.module.css";
import ProjectIcon from "../images/pageIcons/ProjectIcon.svg";
import YoutubeIcon from "../images/pageIcons/YoutubeIcon.svg";
import ArticleIcon from "../images/pageIcons/ArticleIcon.svg";

function PageBannerIcon({ pageId }) {
    if (pageId === "videos") {
        return <YoutubeIcon className={styles.youtubeIcon} />;
    } else if (pageId === "projects") {
        return <ProjectIcon className={styles.projectIcon} />;
    } else if (pageId === "articles") {
        return <ArticleIcon className={styles.articleIcon} />;
    } else {
        return null;
    }
}

export default PageBannerIcon;
