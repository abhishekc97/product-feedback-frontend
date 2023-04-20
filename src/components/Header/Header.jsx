import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn }) {
    function handleLogout() {
        console.log("log out");
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
                        isLoggedIn ? styles.hide : styles.show
                    }`}
                >
                    Log in
                </Link>
                <Link
                    to="/register"
                    className={`${styles.signupButton} ${styles.textStyle} ${
                        isLoggedIn ? styles.hide : styles.show
                    }`}
                >
                    Sign up
                </Link>
                <Link
                    to="/home"
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${styles.textStyle} ${
                        isLoggedIn ? styles.show : styles.hide
                    }`}
                >
                    Log out
                </Link>
                <div
                    className={`${styles.profileBox} ${styles.textStyle} ${
                        isLoggedIn ? styles.show : styles.hide
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
