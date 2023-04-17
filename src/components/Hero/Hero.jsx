import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <div className={styles.heroWrapper} id="hero">
            <div className={styles.left}>
                <img
                    src="/images/product feedback hero image.png"
                    alt="hero_image"
                />
            </div>
            <div className={styles.right}>
                <span className={styles.heroTitle}>
                    Add your products and give your valuable feedback
                </span>
                <span className={styles.heroDescription}>
                    Easily give your feedback in a matter of minutes. Access
                    your audience on all platforms. Observe result manually in
                    real time
                </span>
            </div>
        </div>
    );
}
