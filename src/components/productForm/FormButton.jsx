import React from "react";
import * as styles from "../../scss/formElements/formButton.module.scss";

function FormButton(props) {
    const { allow, text } = props;

    const btnStyle = allow === true ? styles.form_btn : styles.form_btn_prevent;

    return (
        <button className={btnStyle} type="submit">
            {text}
        </button>
    );
}

export default FormButton;
