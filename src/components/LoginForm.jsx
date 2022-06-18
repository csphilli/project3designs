import React from "react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FiMail, FiKey, FiLock } from "react-icons/fi";
import * as styles from "../scss/loginForm.module.scss";

const handleForgottenPW = () => {
    console.log(`popup Modal for forgotten PW`);
};

const handleSignUp = () => {
    console.log(`Popup modal for signing up`);
};

const handleSignIn = (e) => {
    e.preventDefault();
    console.log(`Handling sign in`);
};

function LoginForm() {
    return (
        <div className={styles.login_container}>
            <p className={styles.login_subject_text}>Sign in with</p>
            <div className={styles.oauth_container}>
                <BsGoogle className={styles.icon} />
                <p className={styles.oauth_text}>sign up with Google</p>
            </div>
            <div className={styles.oauth_container}>
                <BsFacebook className={styles.icon} />
                <p className={styles.oauth_text}>sign up with Facebook</p>
            </div>
            <div className={styles.divider_container}>
                <p className={styles.divider_text}>or continue with</p>
            </div>
            <form onSubmit={handleSignIn}>
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
                    <p>Sign In</p>
                </button>
            </form>

            <div className={styles.sign_up_forgot_container}>
                <button className={styles.text_button} onClick={handleSignUp}>
                    Don't have an account? Sign up!
                </button>
                <button
                    className={styles.text_button}
                    onClick={handleForgottenPW}
                >
                    Forgot password?
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
