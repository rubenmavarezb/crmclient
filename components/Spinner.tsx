import styles from '../styles/Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles["spinner"]}>
            <div className={styles["sk-chase"]}>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
                <div className={styles["sk-chase-dot"]}></div>
            </div>
        </div>
    )
}

export default Spinner;