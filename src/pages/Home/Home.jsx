import styles from "./Home.module.scss";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";

export default function Home() {
    return (
        <div className={styles.homeWrapper}>
            <Header />
            <div className={styles.sections}>
                <Hero />
            </div>
        </div>
    );
}
