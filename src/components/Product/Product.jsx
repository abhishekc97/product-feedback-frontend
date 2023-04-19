import { useEffect, useState, useRef } from "react";
import {
    getProductById,
    commentOnProduct,
    upvoteProduct,
} from "../../api/productsAPI";
import styles from "./Product.module.scss";

export default function Product({ product }) {
    const productId = product._id;
    const [productLocal, setProductLocal] = useState(product);
    const [isOpenCommentsDropdown, setIsOpenCommentsDropdown] = useState(false);

    const [newComment, setNewComment] = useState("");
    const scrollRef = useRef(null);

    async function getProduct() {
        const result = await getProductById(productId);
        setProductLocal(result);
    }

    useEffect(() => {
        setProductLocal(product);
    }, []);

    useEffect(() => {
        getProduct(productId);
    }, [product]);

    async function handleSubmitComment() {
        const result = await commentOnProduct(productId, newComment);
        setProductLocal(result);
        setNewComment("");
        scrollToLatest();
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSubmitComment();
        }
    }

    function scrollToLatest() {
        scrollRef.current?.lastChild.scrollIntoView({ behavior: "smooth" });
    }

    async function handleUpvoteProduct() {
        const result = await upvoteProduct(productId);
        setProductLocal(result);
    }

    return (
        <div className={styles.productWrapper}>
            <div className={styles.productDetailsTop}>
                <div className={styles.left}>
                    <img
                        src={product.logoImageURL}
                        alt={product.name}
                        className={styles.productLogo}
                    />
                </div>
                <div className={styles.center}>
                    <div className={styles.centerTop}>
                        <span>{productLocal.name}</span>
                    </div>
                    <div className={styles.centerMiddle}>
                        <span>{productLocal.description}</span>
                    </div>
                    <div className={styles.centerBottom}>
                        <div className={styles.productCategories}>
                            {productLocal.category &&
                                productLocal.category.map((category) => (
                                    <div
                                        className={styles.categoryBox}
                                        key={category}
                                    >
                                        {category}
                                    </div>
                                ))}
                        </div>
                        <div
                            className={styles.commentButton}
                            onClick={() =>
                                setIsOpenCommentsDropdown(
                                    !isOpenCommentsDropdown
                                )
                            }
                        >
                            <div className={styles.commentLogo}></div>
                            Comment
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightInner}>
                        <div
                            className={styles.upvoteButton}
                            onClick={() => handleUpvoteProduct()}
                        >
                            <div className={styles.upvoteLogo}></div>
                            <div className={styles.upvoteText}>
                                {productLocal.upvoteCount}
                            </div>
                        </div>
                        <div className={styles.rightInnerBottom}>
                            <div className={styles.editButton}>
                                <span>Edit</span>
                            </div>
                            <div className={styles.commentCount}>
                                {productLocal.comments.length}
                                <div className={styles.commentCountLogo}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenCommentsDropdown && (
                <div className={styles.commentDropDownContainer}>
                    <div className={styles.commentBox}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className={styles.commentInputBox}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className={styles.sendButton}
                            onClick={() => {
                                handleSubmitComment();
                            }}
                        ></button>
                    </div>
                    <div className={styles.commentsContainer}>
                        {productLocal.comments.map((comment, index) => (
                            <div className={styles.commentRow} key={index}>
                                <div className={styles.commentEllipse}></div>
                                <div className={styles.commentText}>
                                    {comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
