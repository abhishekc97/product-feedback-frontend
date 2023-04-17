import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.headerWrapper}>
            <span className={styles.headerTitle}>Feedback</span>
        </div>
    );
}
