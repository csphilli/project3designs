import React from "react";
import * as styles from "../scss/video.module.scss";

function Video({ videoID, videoTitle, ...props }) {
    return (
        <div className={styles.video_container}>
            <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${videoID}`}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Video;
