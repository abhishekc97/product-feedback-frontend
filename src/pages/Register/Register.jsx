import styles from "./Register.module.scss";
import { useState } from "react";
import { registerUser } from "../../api/userOperationsAPI";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function validateForm() {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^\+?\d{0,3}?\d{10}$/;

        if (!formData.name.trim()) {
            errors.name = "Name cannot be empty";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Email address format is invalid";
        }
        if (!formData.mobile.trim()) {
            errors.mobile = "Please give a 10 digit phone number";
        } else if (!mobileRegex.test(formData.mobile)) {
            errors.mobile = "Incorrect format. Follow +00 123-456-7890";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleRegister(e) {
        e.preventDefault();
        const isValidForm = validateForm();
        if (isValidForm) {
            // api to register
            try {
                let response = await registerUser(formData);
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    toast.success("Registration successfull!", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                }
            } catch (error) {
                toast.error("Could not register.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    }

    return (
        <div className={styles.registerWrapper}>
            <div className={styles.registerInnerWrapper}>
                <div className={styles.pageHeadline}>Feedback</div>
                <div className={styles.pageDescription}>
                    Add your products and give us your valuable feedback
                </div>
                <div className={styles.registerContainer}>
                    <form
                        onSubmit={handleRegister}
                        className={styles.registerForm}
                    >
                        <div className={styles.inputRow}>
                            <span className={styles.nameIcon}></span>
                            <input
                                type="text"
                                placeholder="Name"
                                className={styles.inputBox}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formErrors.name && (
                            <span className={styles.formValidationError}>
                                {formErrors.name}
                            </span>
                        )}
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
                            <span className={styles.mobileIcon}></span>
                            <input
                                type="tel"
                                placeholder="Mobile"
                                className={styles.inputBox}
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formErrors.mobile && (
                            <span className={styles.formValidationError}>
                                {formErrors.mobile}
                            </span>
                        )}
                        <div className={styles.inputRow}>
                            <span className={styles.lockIcon}></span>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password"
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
                            <span>Already have an account?</span>
                            <Link to="/login">Log In</Link>
                        </div>
                        <button type="submit" className={styles.registerButton}>
                            Signup
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
