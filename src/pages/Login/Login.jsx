import styles from "./Login.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const [formErrors, setFormErrors] = useState({ email: "", password: "" });

    function validateForm() {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Email address format is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleLogin(e) {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // api to login
            console.log("valid");
        }
        // redirect to /home
    }
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginInnerWrapper}>
                <div className={styles.pageHeadline}>Feedback</div>
                <div className={styles.pageDescription}>
                    Add your products and give us your valuable feedback
                </div>
                <div className={styles.loginContainer}>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.inputRow}>
                            <span className={styles.mailIcon}></span>
                            <input
                                type="email"
                                placeholder="Email*"
                                className={styles.inputBox}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formErrors.email && (
                            <span className={styles.formValidationError}>
                                {formErrors.email}
                            </span>
                        )}
                        <div className={styles.inputRow}>
                            <span className={styles.lockIcon}></span>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password*"
                                className={styles.inputBox}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <i
                                id="togglePassword"
                                className={
                                    isPasswordVisible
                                        ? "far fa-eye"
                                        : "far fa-eye-slash"
                                }
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            ></i>
                        </div>
                        {formErrors.password && (
                            <span className={styles.formValidationError}>
                                {formErrors.password}
                            </span>
                        )}
                        <div className={styles.moreActionsContainer}>
                            <span>Don’t have an account?</span>
                            <Link to="/register">Sign up</Link>
                        </div>
                        <button type="submit" className={styles.loginButton}>
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
