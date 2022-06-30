/* PROFILE
This will serve as the profile page when a user is logged in.
Make sure to use a userContext within the navbar component that will update the link from 'login' to 'profile' when there's an active user session.

Here's a template for updating the password. The styling is in the LoginForm module.

<div className={styles.login_container}>
                    {errors.length > 0 && (
                        <div className={styles.error_msg}>{errors}</div>
                    )}
                    <h4 className={styles.title}>
                        Now just submit a new password.
                    </h4>
                    <form onSubmit={handleUpdatePassword}>
                        <label htmlFor="password">New Password</label>
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
                                    <p>{BUTTON_TEXT.UPDATE_PW}</p>
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
*/
