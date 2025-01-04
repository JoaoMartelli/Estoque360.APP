import styles from './_loader.module.css'

const Loader = () => {
    return (
        <div className={styles.escuro}>
        <div className={styles.spinner}>
            <div className={styles.center}>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;