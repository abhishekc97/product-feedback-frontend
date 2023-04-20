import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./LoginModal.module.css";

export default function LoginModal({ show, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

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

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        height: "80%",
        bgcolor: "background.paper",
        border: "none",
        p: 0,
    };

    return (
        <Modal
            open={show}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={styles.loginModalWrapper}>
                    <div className={styles.left}>
                        <div className={styles.leftHeadline}>
                            Log in to continue
                        </div>
                        <form
                            onSubmit={handleLogin}
                            className={styles.loginForm}
                        >
                            <div className={styles.inputContainer}>
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
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.inputRow}>
                                    <span className={styles.lockIcon}></span>
                                    <input
                                        type={
                                            isPasswordVisible
                                                ? "text"
                                                : "password"
                                        }
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
                                            setIsPasswordVisible(
                                                !isPasswordVisible
                                            )
                                        }
                                    ></i>
                                </div>
                                {formErrors.password && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.password}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.loginButton}
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.rightHeadline}>Feedback</div>
                        <div className={styles.rightDescription}>
                            Add your product and rate other items.........
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
