import React from "react";
import { FiMail, FiKey, FiLock } from "react-icons/fi";
import * as styles from "../scss/loginForm.module.scss";

const handleSignUp = () => {
    console.log(`Popup modal for signing up`);
};

function SignUpForm() {
    return (
        <div className={styles.sign_up_container}>
            <p className={styles.sign_up_subject_text}>Sign in with</p>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email">E-mail Address</label>
                <div className={styles.input_container}>
                    <FiMail className={styles.input_icon} />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                    ></input>
                </div>
                <label htmlFor="password">Password</label>
                <div className={styles.input_container}>
                    <FiKey className={styles.input_icon} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    ></input>
                </div>
                <button className={styles.submit_button}>
                    <FiLock className={styles.sign_in_icon} />
                    <p>Sign Un</p>
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;
