import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header({ isAuthenticated }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch({ type: "logout" });
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <Link to="/" className={styles.mainPageLink}>
                    Feedback
                </Link>
                <Link
                    to="/login"
                    className={`${styles.loginButton} ${styles.textStyle} ${
                        isAuthenticated ? styles.hide : styles.show
                    }`}
                >
                    Log in
                </Link>
                <Link
                    to="/register"
                    className={`${styles.signupButton} ${styles.textStyle} ${
                        isAuthenticated ? styles.hide : styles.show
                    }`}
                >
                    Sign up
                </Link>
                <div
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${styles.textStyle} ${
                        isAuthenticated ? styles.show : styles.hide
                    }`}
                >
                    Log out
                </div>
                <div
                    className={`${styles.profileBox} ${styles.textStyle} ${
                        isAuthenticated ? styles.show : styles.hide
                    }`}
                >
                    <span>Hello!</span>
                    <img
                        src="/images/default_profile_picture.png"
                        className={styles.profilePic}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
