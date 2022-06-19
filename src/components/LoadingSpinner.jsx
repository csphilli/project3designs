import React from "react";
import * as productLoading from "../scss/productLoadingSpinner.module.scss";
import * as buttonLoading from "../scss/buttonLoadingSpinner.module.scss";

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

    console.log(`type: ${type}`);

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
