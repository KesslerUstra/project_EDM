import styles from './HomeLoading.module.css'

export default function HomeLoading(){
    return(
        <div className={styles.loading_box}>
            <span className={styles.loader_title}>Carregando</span>
            <span className={styles.loader}>
                <span className={styles.loader_inner}></span>
            </span>
        </div>
    )
}