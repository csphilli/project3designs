import React from "react";
import * as styles from "../scss/loadingSpinner.module.scss";

function LoadingSpinner() {
    return (
        <div className={styles.spinner_parent}>
            <div className={styles.lds_roller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
