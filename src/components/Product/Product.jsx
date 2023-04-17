import { useState } from "react";
import styles from "./Product.module.scss";

export default function Product({ product }) {
    const [isOpenCommentsDropdown, setIsOpenCommentsDropdown] = useState(false);
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
                        <h3>Product {product.name}</h3>
                    </div>
                    <div className={styles.centerMiddle}>
                        {product.description}
                    </div>
                    <div className={styles.centerBottom}>
                        <div className={styles.productCategories}>
                            {product.category &&
                                product.category.map((category) => (
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
                    <div className={styles.upvoteButton}></div>
                    <div className={styles.rightBottom}>
                        <div className={styles.editButton}>Edit</div>
                        <div className={styles.commentCount}></div>
                    </div>
                </div>
            </div>
            {isOpenCommentsDropdown && (
                <div className={styles.commentDropDownContainer}>
                    <div className={styles.commentInputBox}>
                        <input type="text" placeholder="Add a comment..." />
                        <div className={styles.sendButton}></div>
                    </div>
                    <div className={styles.commentsContainer}>
                        {product.comments.map((comment) => (
                            <div className={styles.commentText} key={comment}>
                                {comment}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
