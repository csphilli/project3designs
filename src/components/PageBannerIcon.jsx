import React from "react";
import * as styles from "../scss/pageIcon.module.scss";
import ProjectIcon from "../images/pageIcons/ProjectIcon.svg";
import YoutubeIcon from "../images/pageIcons/YoutubeIcon.svg";

function PageBannerIcon({ pageId }) {
    if (pageId === "videos") {
        return <YoutubeIcon className={styles.youtubeIcon} />;
    } else if (pageId === "projects") {
        return <ProjectIcon className={styles.projectIcon} />;
    } else {
        return null;
    }
}

export default PageBannerIcon;
