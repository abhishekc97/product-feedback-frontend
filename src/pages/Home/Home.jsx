import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";
import { getAllCategories, getProductsByCategory } from "../../api/productsAPI";
import Product from "../../components/Product/Product";

export default function Home() {
    return (
        <div className={styles.homeWrapper}>
            <Header />
            <div className={styles.sections}>
                <Hero />
                <Main />
            </div>
        </div>
    );
}

function Main() {
    const [categoryFilter, setCategoryFilter] = useState("category1");
    const [categoryList, setCategoryList] = useState([]);
    const [productsList, setProductsList] = useState([]);

    async function getCategories() {
        const list = await getAllCategories();
        setCategoryList(list);
    }

    useEffect(() => {
        getCategories();
    }, []);

    async function getProductList() {
        const list = await getProductsByCategory(categoryFilter);
        setProductsList(list);
    }

    useEffect(() => {
        getProductList();
    }, [categoryFilter]);

    function handleFilterChange(categoryName) {
        setCategoryFilter(categoryName);
    }

    useEffect(() => {
        console.log("categoryFilter", categoryFilter);
        console.log("categoryList ", categoryList);
        console.log("productsList ", productsList);
    }, [categoryList, productsList]);

    return (
        <div className={styles.mainWrapper} id="main">
            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <div className={styles.leftTopTitle}>Feedback</div>
                    <div className={styles.leftTopDescription}>
                        Apply Filter
                    </div>
                </div>
                <div className={styles.leftBottom}>
                    <div
                        className={`${styles.categoryBox} ${
                            categoryFilter === "all"
                                ? styles.categorySelected
                                : styles.categoryUnselected
                        }`}
                        onClick={() => handleFilterChange("all")}
                    >
                        <span className={styles.boxText}>All</span>
                    </div>
                    {categoryList &&
                        categoryList.map((category) => (
                            <div
                                key={category._id}
                                className={`${styles.categoryBox} ${
                                    categoryFilter === category.name
                                        ? styles.categorySelected
                                        : styles.categoryUnselected
                                }`}
                                onClick={() =>
                                    handleFilterChange(category.name)
                                }
                            >
                                <span className={styles.boxText}>
                                    {category.name.charAt(0).toUpperCase() +
                                        category.name.slice(1)}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <div className={styles.suggestionCount}>10 Suggestions</div>
                    <div className={styles.sortContainer}>
                        <span>Sort By:</span>
                        <select name="sort" id="sort" defaultValue="default">
                            <option
                                value="default"
                                disabled
                                className={styles.selectDropdownOption}
                            >
                                Select
                            </option>
                            <option
                                value="upvotes"
                                className={styles.selectDropdownOption}
                            >
                                Upvotes
                            </option>
                            <option
                                value="comments"
                                className={styles.selectDropdownOption}
                            >
                                Comments
                            </option>
                        </select>
                    </div>
                    <button className={styles.addProductButton}>
                        + Add Product
                    </button>
                </div>
                <div className={styles.productListContainer}>
                    {productsList &&
                        productsList.map((product) => (
                            <div className={styles.productBoxWrapper}>
                                <Product key={product._id} product={product} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
