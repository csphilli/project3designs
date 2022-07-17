import React from "react";
import * as buttonLoading from "../scss/spinners/buttonLoading.module.scss";
import * as productLoading from "../scss/spinners/productLoading.module.scss";
import * as spinner from "../scss/spinners/spinner.module.scss";

function LoadingSpinner({ type }) {
    const getSpinnerStyle = (s) => {
        switch (s) {
            case "products": {
                return productLoading.lds_roller;
            }
            case "button": {
                return buttonLoading.lds_roller;
            }
            default: {
                return buttonLoading.lds_roller;
            }
        }
    };

    return (
        <div className={spinner.spinner_container}>
            <div className={getSpinnerStyle(type)}>
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
