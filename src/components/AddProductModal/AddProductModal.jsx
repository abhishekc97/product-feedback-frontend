import { useState } from "react";
import { createProduct } from "../../api/productsAPI";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./AddProductModal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductModal({ show, onClose, handleProductAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        logoImageURL: "",
        productLink: "",
        description: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        category: "",
        logoImageURL: "",
        productLink: "",
        description: "",
    });

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function validateForm() {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name cannot be empty";
        }
        if (!formData.category.trim()) {
            errors.category = "Category cannot be empty";
        }
        if (!formData.logoImageURL.trim()) {
            errors.logoImageURL = "Logo URL cannot be empty";
        }
        if (!formData.productLink.trim()) {
            errors.productLink = "Product link cannot be empty";
        }
        if (!formData.description.trim()) {
            errors.description = "Description cannot be empty";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // make the API call
            try {
                let response = await createProduct(formData);
                if (response.status === 200) {
                    setTimeout(() => {
                        handleProductAdded();
                        toastSuccessAlert();
                    }, 1500);
                    onClose();
                }
            } catch (error) {
                toastFailureAlert();
            }
        }
    }
    function toastSuccessAlert() {
        toast.success("Product added!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    function toastFailureAlert() {
        toast.error("Could not add the new product.", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
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
                <div className={styles.addProduct}>
                    <div className={styles.left}>
                        <div className={styles.leftHeadline}>
                            Add your product
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.addProductForm}
                        >
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    placeholder="Name of the company"
                                    className={styles.inputBox}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                {formErrors.category && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    placeholder="Category"
                                    className={styles.inputBox}
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                />
                                {formErrors.category && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.category}
                                    </span>
                                )}
                            </div>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    placeholder="Add logo url"
                                    className={styles.inputBox}
                                    name="logoImageURL"
                                    value={formData.logoImageURL}
                                    onChange={handleInputChange}
                                />
                                {formErrors.logoImageURL && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.logoImageURL}
                                    </span>
                                )}
                            </div>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    placeholder="Link of product"
                                    className={styles.inputBox}
                                    name="productLink"
                                    value={formData.productLink}
                                    onChange={handleInputChange}
                                />
                                {formErrors.productLink && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.productLink}
                                    </span>
                                )}
                            </div>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    placeholder="Add description"
                                    className={styles.inputBox}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                                {formErrors.description && (
                                    <span
                                        className={styles.formValidationError}
                                    >
                                        {formErrors.description}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                + Add
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
