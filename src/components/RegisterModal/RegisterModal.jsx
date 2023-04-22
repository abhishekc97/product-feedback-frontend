import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./RegisterModal.module.css";
import { registerUser } from "../../api/userOperationsAPI";
import { toast } from "react-toastify";

export default function RegisterModal({
    show,
    redirectToLogin,
    onClose,
    handleRegisterSuccess,
}) {
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
                    setTimeout(() => {
                        toast("Registration successfull!", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        handleRegisterSuccess();
                    }, 1000);
                }
            } catch (error) {
                toast.error("Could not register.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    }

    // MUI style
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
                <div className={styles.registerModalWrapper}>
                    <div className={styles.left}>
                        <div className={styles.leftHeadline}>
                            Signup to continue
                        </div>
                        <form
                            onSubmit={handleRegister}
                            className={styles.registerForm}
                        >
                            <div className={styles.inputContainer}>
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
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>
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
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.mobile}
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
                            <div className={styles.moreActionsContainer}>
                                <span>Already have an account?</span>
                                <button
                                    className={styles.redirectButton}
                                    onClick={() => redirectToLogin()}
                                >
                                    Log In
                                </button>
                            </div>
                            <button
                                type="submit"
                                className={styles.registerButton}
                            >
                                Signup
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
