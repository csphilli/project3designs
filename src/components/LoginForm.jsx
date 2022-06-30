import React, { useReducer, useRef, useState } from "react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FiMail, FiKey, FiLock, FiUser } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";
import * as styles from "../scss/loginForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

const EXAMPLE_URL =
    "#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjU2NDA5NDgzLCJzdWIiOiJjMGY0NjZlZi01ODcxLTRjODYtODA5OC1jZjhjODE3YjQ1MTAiLCJlbWFpbCI6ImNzcGhpbGxpQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsibmFtZSI6IkNocmlzdG9waGVyIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.KNGUP59b_tJIgEIFMS8aY2mn0Nsermf99d3nw4bKNTQ&expires_in=3600&refresh_token=Ebiqh4dBryrL3JzZZjI4wA&token_type=bearer&type=recovery";

/* TODO
1) Need to have error array to display any errors return from various functions such as invalid username and/or pw, desired username taken, etc
2) needs to be success states for sign up, pw reset sent
3) Need link to privacy policy
*/

/* PERSIST THE LOGGED IN USER?
useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setCurrentUser(session ? true : false);
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);

        const {data, error} = await supabase
          .from('users')
          .select('name,profileImage,userName')
          .eq('uid', session.user.id);

        const currentUser = {
          ...data,
          id: session.user.id,
        };

        setSession(session);
        setCurrentUser(session ? currentUser : null);
      },
    );
    return () => {
      !authListener.unsubscribe();
    };
  }, [currentUser]);
*/

const TOGGLES = {
    SIGNIN: "signIn",
    SIGNUP: "signUp",
    FORGOT: "forgot",
    SIGNUP_SUCCESS: "signUpSuccess",
    RESET_SUCCESS: "resetSuccess",
    UPDATE_PASSWORD: "updatePassword",
};

const BUTTON_TEXT = {
    SIGNIN: "Sign In",
    SIGNUP: "Sign Up",
    FORGOT: "Reset Password",
    UPDATE_PW: "Update Password",
};

const defaultFormData = {
    fName: "",
    lName: "",
    uName: "",
    email: "",
    pw: "",
};

/* TODO
use a useEffect on initial page load which will disect the site URL looking for any password recovery token.

A token accompanies this url. verify the signature

if Checks work out, use the useRefresh to toggle an updatePasswordword area.

if a password is rest, the old one shouldn't work. But i dont think this is the behavior I've seen.

*/

const toggleReducer = (state, action) => {
    switch (action.type) {
        case TOGGLES.SIGNIN:
            return {
                signIn: true,
                signUp: false,
                forgot: false,
                signUpSuccess: false,
                resetSuccess: false,
                updatePassword: false,
            };
        case TOGGLES.SIGNUP:
            return {
                signIn: false,
                signUp: true,
                forgot: false,
                signUpSuccess: false,
                resetSuccess: false,
                updatePassword: false,
            };
        case TOGGLES.FORGOT:
            return {
                signIn: false,
                signUp: false,
                forgot: true,
                signUpSuccess: false,
                resetSuccess: false,
                updatePassword: false,
            };
        case TOGGLES.SIGNUP_SUCCESS:
            return {
                signIn: false,
                signUp: false,
                forgot: false,
                signUpSuccess: true,
                resetSuccess: false,
                updatePassword: false,
            };
        case TOGGLES.RESET_SUCCESS:
            return {
                signIn: false,
                signUp: false,
                forgot: false,
                signUpSuccess: false,
                resetSuccess: true,
                updatePassword: false,
            };
        case TOGGLES.UPDATE_PASSWORD:
            return {
                signIn: false,
                signUp: false,
                forgot: false,
                signUpSuccess: false,
                resetSuccess: false,
                updatePassword: true,
            };
        default:
            return {
                signIn: true,
                signUp: false,
                forgot: false,
                signUpSuccess: false,
                resetSuccess: false,
                updatePassword: false,
            };
    }
};

function LoginForm() {
    // const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const reRef = useRef();
    const [toggles, dispatch] = useReducer(toggleReducer, {
        signIn: true,
        signUp: false,
        forgot: false,
        signUpSuccess: false,
        resetSuccess: false,
        updatePassword: false,
    });

    // useEffect(() => {
    // const url = window.location.href;
    // const url = `${window.location.href}${EXAMPLE_URL}`;
    // const redirectObj = getRedirectObj(url);
    // if (redirectObj["type"] === "recovery") {
    //     console.log("TYPE IS RECOVERY");
    // }
    // if (url.includes("type=recovery")) {
    //     toggleUpdatePassword();
    // }

    // console.log(redirectObj["expires_in"]);

    // console.log(Object.keys(redirectObj));

    // const verifiedToken = fetch("/.netlify/functions/verifyJWT", {
    //     method: "POST",
    //     headers: {
    //         authorization: `Bearer ${token}`,
    //         "Content-Type" : "application/json",
    //     },
    // });
    // }, []);

    const getRecaptcha = async () => {
        const recaptcha = await reRef.current.executeAsync();
        reRef.current.reset();
        return recaptcha;
    };

    const clearErrors = async () => {
        setErrors("");
    };

    const toggleSignIn = () => {
        clearErrors();
        dispatch({ type: TOGGLES.SIGNIN });
    };
    const toggleSignUp = () => {
        clearErrors();
        dispatch({ type: TOGGLES.SIGNUP });
    };
    const toggleForgot = () => {
        clearErrors();
        dispatch({ type: TOGGLES.FORGOT });
    };

    const toggleSignupSuccess = () => {
        clearErrors();
        dispatch({ type: TOGGLES.SIGNUP_SUCCESS });
    };
    const toggleResetSuccess = () => {
        clearErrors();
        dispatch({ type: TOGGLES.RESET_SUCCESS });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        clearErrors();
        const recaptcha = await getRecaptcha();

        const form = new FormData(e.target);

        const resp = await fetch("/.netlify/functions/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.P3D_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                email: form.get("email"),
                password: form.get("password"),
                recaptcha: recaptcha,
            }),
        });
        const data = await resp.json();
        if (!resp.ok) {
            setErrors(data);
        } else if (resp.ok) {
            console.log(`Logged in OK. TOKEN: ${data}`);
        }
        setLoading(false);
    };

    const setDefaults = (fname, lname, uname, email) => {
        defaultFormData.fName = fname;
        defaultFormData.lName = lname;
        defaultFormData.uName = uname;
        defaultFormData.email = email;
    };

    const clearDefaults = async () => {
        defaultFormData.fName = "";
        defaultFormData.lName = "";
        defaultFormData.uName = "";
        defaultFormData.email = "";
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        clearErrors();
        const form = new FormData(e.target);
        const recaptcha = await getRecaptcha();

        setDefaults(
            form.get("fname"),
            form.get("lname"),
            form.get("uname"),
            form.get("email")
        );

        const resp = await fetch("/.netlify/functions/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.P3D_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                fName: defaultFormData.fName,
                lName: defaultFormData.lName,
                uName: defaultFormData.uName,
                email: defaultFormData.email,
                password: form.get("password"),
                password_again: form.get("password_again"),
                recaptcha: recaptcha,
            }),
        });
        if (!resp.ok) {
            const data = await resp.json();
            setErrors(data);
        } else if (resp.ok) {
            clearDefaults();
            // console.log(`SIGN UP. TOKEN: ${data.token}`);

            // there will be a session token returned here.
            toggleSignupSuccess();
        }
        setLoading(false);
    };

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        clearErrors();
        const recaptcha = await getRecaptcha();

        const form = new FormData(e.target);

        const resp = await fetch("/.netlify/functions/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.P3D_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                email: form.get("email"),
                recaptcha: recaptcha,
            }),
        });
        if (!resp.ok) {
            const data = await resp.json();
            setErrors(data);
        } else if (resp.ok) {
            clearDefaults();

            // there will be a session token returned here.
            toggleResetSuccess();
        }
        setLoading(false);
    };

    // Move to profile page
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        clearErrors();

        const resp = await fetch("/.netlify/functions/updateUserPW", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.P3D_AUTH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(`${window.location.href}${EXAMPLE_URL}`),
        });
        if (!resp.ok) {
            const error = resp.json();
            setErrors(error);
        } else {
            console.log(
                "Password update success. Do something with login now."
            );
        }
        setLoading(false);
    };

    return (
        <div>
            {toggles.signIn && (
                <div className={styles.login_container}>
                    {errors.length > 0 && (
                        <div className={styles.error_msg}>{errors}</div>
                    )}
                    <h4 className={styles.title}>Sign in</h4>
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
                    <form onSubmit={handleSignIn} id="testing">
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
                        <ReCAPTCHA
                            size="invisible"
                            ref={reRef}
                            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                        />
                        <button id="test" className={styles.submit_button}>
                            {loading ? (
                                <LoadingSpinner type="button" />
                            ) : (
                                <>
                                    <FiLock className={styles.btn_icon} />
                                    <p>{BUTTON_TEXT.SIGNIN}</p>
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
            {toggles.signUp && (
                <div className={styles.login_container}>
                    {errors.length > 0 && (
                        <div className={styles.error_msg}>{errors}</div>
                    )}
                    <h4 className={styles.title}>Create an account</h4>
                    <form id="signUpForm" onSubmit={handleSignUp}>
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
                                pattern=".{6,}"
                                title="Must be at least 6 characters"
                                defaultValue=""
                                required
                            ></input>
                        </div>
                        <label htmlFor="password">Re-type Password</label>
                        <div className={styles.input_container}>
                            <FiKey className={styles.input_icon} />
                            <input
                                type="password"
                                name="password_again"
                                id="password_again"
                                pattern=".{6,}"
                                title="Must be at least 6 characters"
                                defaultValue=""
                                required
                            ></input>
                        </div>
                        {/* <p className={styles.disclosure_notice}>
                            By signing up you agree to be included in our
                            non-spammy email list
                        </p> */}
                        <ReCAPTCHA
                            size="invisible"
                            ref={reRef}
                            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                        />
                        <button id="test" className={styles.submit_button}>
                            {loading ? (
                                <LoadingSpinner type="button" />
                            ) : (
                                <>
                                    <FiLock className={styles.btn_icon} />
                                    <p>{BUTTON_TEXT.SIGNUP}</p>
                                </>
                            )}
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

            {toggles.forgot && (
                <div className={styles.login_container}>
                    {errors.length > 0 && (
                        <div className={styles.error_msg}>{errors}</div>
                    )}
                    <h4 className={styles.title}>It happens</h4>
                    <p className={styles.forgot_text}>
                        Don't worry. Just enter your email below, press the
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
                        <button id="test" className={styles.submit_button}>
                            {loading ? (
                                <LoadingSpinner type="button" />
                            ) : (
                                <>
                                    <FiLock className={styles.btn_icon} />
                                    <p>{BUTTON_TEXT.FORGOT}</p>
                                </>
                            )}
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

            {toggles.signUpSuccess && (
                <div className={styles.login_container}>
                    <div className={styles.signup_success_container}>
                        <h2 className={styles.success_title}>Success!</h2>
                        <p>
                            A confirmation email has been sent to the address
                            you provided. To complete the setup, just click the
                            link provided in that email.
                        </p>
                        <p>Thank you!</p>
                    </div>
                </div>
            )}
            {toggles.resetSuccess && (
                <div className={styles.login_container}>
                    <div className={styles.signup_success_container}>
                        <h2 className={styles.success_title}>Success!</h2>
                        <p>
                            An email with a reset link has been sent to the
                            email you provided. The link is only valid for 60
                            seconds from the time you see this message.
                        </p>
                        <p>Thank you!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
