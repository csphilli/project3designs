import React from "react";
import * as productLoading from "../scss/spinners/productLoading.module.scss";
import * as buttonLoading from "../scss/spinners/buttonLoading.module.scss";

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
    );
}

export default LoadingSpinner;
