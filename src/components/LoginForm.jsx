import React, { useState } from "react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FiMail, FiKey, FiLock, FiUser } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";
import * as styles from "../scss/loginForm.module.scss";

function LoginForm() {
    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [btnStatus, setBtnStatus] = useState(styles.active);

    // let submitBtnClass = styles.submit_button;

    const toggleSignIn = () => {
        setSignIn(true);
        setSignUp(false);
        setForgot(false);
    };
    const toggleSignUp = () => {
        setSignIn(false);
        setSignUp(true);
        setForgot(false);
    };
    const toggleForgot = () => {
        setSignIn(false);
        setSignUp(false);
        setForgot(true);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        // setBtnStatus(styles.inactive);
        setLoading(true);
        console.log(`handling sign in...`);
        console.log(e.target);
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(`handling sign up...`);
    };
    const handleForgot = (e) => {
        e.preventDefault();
        console.log(`handling forgot...`);
    };

    return (
        <div>
            {signIn && (
                <div className={styles.login_container}>
                    <p className={styles.login_subject_text}>Sign in...</p>
                    <button className={styles.oauth_container}>
                        <BsGoogle className={styles.icon} />
                        <p className={styles.oauth_text}>with Google</p>
                    </button>
                    <button className={styles.oauth_container}>
                        <BsFacebook className={styles.icon} />
                        <p className={styles.oauth_text}>with Facebook</p>
                    </button>
                    <div className={styles.divider_container}>
                        <p className={styles.divider_text}>or with</p>
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
                        {/* <button id="test" className={styles.submit_button}> */}
                        <button id="test" className={styles.submit_button}>
                            {loading ? (
                                <LoadingSpinner type="button" />
                            ) : (
                                <>
                                    <FiLock className={styles.btn_icon} />
                                    <p>Sign In</p>
                                </>
                            )}
                        </button>
                    </form>

                    <div className={styles.sign_up_forgot_container}>
                        <button className={styles.sign} onClick={toggleSignUp}>
                            Don't have an account? Sign up!
                        </button>
                        <button
                            className={styles.forgot}
                            onClick={toggleForgot}
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            )}
            {signUp && (
                <div className={styles.login_container}>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor="fname">First Name</label>
                        <div className={styles.input_container}>
                            <FiUser className={styles.input_icon} />
                            <input
                                type="text"
                                name="fname"
                                id="fname"
                                required
                            ></input>
                        </div>
                        <label htmlFor="lname">Last Name</label>
                        <div className={styles.input_container}>
                            <FiUser className={styles.input_icon} />
                            <input
                                type="text"
                                name="lname"
                                id="lname"
                                required
                            ></input>
                        </div>
                        <label htmlFor="uname">User Name</label>
                        <div className={styles.input_container}>
                            <FiUser className={styles.input_icon} />
                            <input
                                type="text"
                                name="uname"
                                id="uname"
                                required
                            ></input>
                        </div>
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
                        <p className={styles.disclosure_notice}>
                            By signing up you agree to be included in our
                            non-spammy email list
                        </p>
                        <div
                            class="g-recaptcha"
                            data-sitekey={`${process.env.GATSBY_RECAPTCHA_KEY}`}
                        ></div>
                        <button className={styles.submit_button}>
                            <FiLock className={styles.btn_icon} />
                            <p>Sign Up</p>
                        </button>
                    </form>

                    <div className={styles.sign_up_forgot_container}>
                        <button className={styles.sign} onClick={toggleSignIn}>
                            Already have an account? Sign in!
                        </button>
                        <button
                            className={styles.forgot}
                            onClick={toggleForgot}
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            )}
            {forgot && (
                <div className={styles.login_container}>
                    <p className={styles.forgot_text}>
                        Don't worry! Just enter your email below, press the
                        button and the reset link will be in your email inbox.
                    </p>
                    <form onSubmit={handleForgot}>
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
                        <button className={styles.submit_button}>
                            <FiLock className={styles.btn_icon} />
                            <p>Reset Password</p>
                        </button>
                    </form>

                    <div className={styles.sign_up_forgot_container}>
                        <button className={styles.sign} onClick={toggleSignUp}>
                            Don't have an account? Sign Up!
                        </button>
                        <button className={styles.sign} onClick={toggleSignIn}>
                            Sign in
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
