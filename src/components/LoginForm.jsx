import React, { useReducer, useRef, useState } from "react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FiMail, FiKey, FiLock, FiUser } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";
import * as styles from "../scss/loginForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { myFetch } from "../lib";

const TOGGLES = {
    SIGNIN: "signIn",
    SIGNUP: "signUp",
    FORGOT: "forgot",
};

const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLES.SIGNIN:
            return { signIn: true, signUp: false, forgot: false };
        case TOGGLES.SIGNUP:
            return { signIn: false, signUp: true, forgot: false };
        case TOGGLES.FORGOT:
            return { signIn: false, signUp: false, forgot: true };
        default:
            return { signIn: true, signUp: false, forgot: false };
    }
};

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const reRef = useRef();
    const [state, dispatch] = useReducer(reducer, {
        signIn: true,
        signUp: false,
        forgot: false,
    });

    // const [btnStatus, setBtnStatus] = useState(styles.active);

    // let submitBtnClass = styles.submit_button;

    const toggleSignIn = () => {
        dispatch({ type: TOGGLES.SIGNIN });
    };
    const toggleSignUp = () => {
        dispatch({ type: TOGGLES.SIGNUP });
    };
    const toggleForgot = () => {
        dispatch({ type: TOGGLES.FORGOT });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        // setBtnStatus(styles.inactive);
        setLoading(true);
        console.log(`handling sign in...`);
        console.log(e.target);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(`handling sign up...`);
        setLoading(true);
        const form = new FormData(e.target);
        const token = await reRef.current.executeAsync();
        console.log(`token: ${token}`);

        myFetch(
            "/.netlify/functions/signUp",
            "POST",
            JSON.stringify({
                fName: form.get("fname"),
                lName: form.get("lname"),
                uName: form.get("unmame"),
                email: form.get("email"),
                pw: form.get("password"),
                token: token,
            })
        );
        // const data = {
        //     fName: form.get("fname"),
        //     lName: form.get("lname"),
        //     uName: form.get("unmame"),
        //     email: form.get("email"),
        //     pw: form.get("password"),
        //     token: token,
        // };
        setLoading(false);
    };
    const handleForgot = async (e) => {
        e.preventDefault();
        console.log(`handling forgot...`);
    };

    return (
        <div>
            {state.signIn && (
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
            {state.signUp && (
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
                        <ReCAPTCHA
                            size="invisible"
                            ref={reRef}
                            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                        />
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
            {state.forgot && (
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
                        <ReCAPTCHA
                            size="invisible"
                            ref={reRef}
                            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                        />
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
