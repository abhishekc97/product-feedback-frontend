import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";
import { getAllCategories, getProductsByCategory } from "../../api/productsAPI";
import Product from "../../components/Product/Product";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.scss";

export default function Home({ isAuthenticated }) {
    return (
        <div className={styles.homeWrapper}>
            <Header isAuthenticated={isAuthenticated} />
            <div className={styles.sections}>
                <Hero />
                <Main isAuthenticated={isAuthenticated} />
            </div>
        </div>
    );
}

function Main({ isAuthenticated }) {
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [categoryList, setCategoryList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const [sort, setSort] = useState("default");

    function handleOpenAddProductModal() {
        if (!isAuthenticated) {
            setShowRegisterModal(true);
        } else if (isAuthenticated) {
            setShowAddProductModal(true);
        }
    }

    function handleOpenLoginModal() {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    }

    function handleRegisterSuccess() {
        toast("Product added!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        handleOpenLoginModal();
    }

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

    function handleSortChange(e) {
        const sortingValue = e.target.value;
        let list = productsList;

        switch (sortingValue) {
            case "upvoteAsc":
                setSort("upvoteAsc");
                list = list.sort((a, b) => a.upvoteCount - b.upvoteCount);
                setProductsList(list);
                break;
            case "upvoteDesc":
                setSort("upvoteDesc");
                list = list.sort((a, b) => b.upvoteCount - a.upvoteCount);
                setProductsList(list);
                break;
            case "commentAsc":
                setSort("commentAsc");
                list = list.sort(
                    (a, b) => a.comments.length - b.comments.length
                );
                setProductsList(list);
                break;
            case "commentDesc":
                setSort("commentDesc");
                list = list.sort(
                    (a, b) => b.comments.length - a.comments.length
                );
                setProductsList(list);
                break;
            default:
                break;
        }
    }

    function handleProductAddAndUpdate() {
        getProductList();
        getCategories();
    }

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
                    <div className={styles.suggestionCount}>
                        {productsList?.length} Suggestions
                    </div>
                    <div className={styles.sortContainer}>
                        <span>Sort By:</span>
                        <select
                            name="sort"
                            id="sort"
                            value={sort}
                            onChange={handleSortChange}
                        >
                            <option value="default" disabled>
                                Select
                            </option>
                            <option value="upvoteAsc">Upvotes (Asc)</option>
                            <option value="upvoteDesc">Upvotes (Desc)</option>
                            <option value="commentAsc">
                                Comment count (Asc)
                            </option>
                            <option value="commentDesc">
                                Comment count (Desc)
                            </option>
                        </select>
                    </div>
                    <button
                        className={styles.addProductButton}
                        onClick={() => {
                            handleOpenAddProductModal();
                        }}
                    >
                        + Add Product
                    </button>
                    {showAddProductModal && (
                        <AddProductModal
                            show={showAddProductModal}
                            onClose={() => setShowAddProductModal(false)}
                            handleProductAddAndUpdate={
                                handleProductAddAndUpdate
                            }
                        />
                    )}
                    {showRegisterModal && (
                        <RegisterModal
                            show={showRegisterModal}
                            redirectToLogin={() => {
                                handleOpenLoginModal();
                            }}
                            handleRegisterSuccess={handleRegisterSuccess}
                            onClose={() => setShowRegisterModal(false)}
                        />
                    )}
                    {showLoginModal && (
                        <LoginModal
                            show={showLoginModal}
                            onClose={() => setShowLoginModal(false)}
                        />
                    )}
                </div>
                <div className={styles.productListContainer}>
                    {productsList &&
                        productsList.map((product, index) => (
                            <div
                                className={styles.productBoxWrapper}
                                key={index}
                            >
                                <Product
                                    key={product._id}
                                    isAuthenticated={isAuthenticated}
                                    product={product}
                                    handleProductAddAndUpdate={
                                        handleProductAddAndUpdate
                                    }
                                />
                            </div>
                        ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
