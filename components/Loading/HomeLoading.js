import styles from './HomeLoading.module.css'

export default function HomeLoading({labelActive = true, styleLoader={}}){
    return(
        <div className={styles.loading_box}>
            {labelActive &&
                <span className={styles.loader_title}>Carregando</span>
            }
            <span style={styleLoader} className={styles.loader}>
                <span className={styles.loader_inner}></span>
            </span>
        </div>
    )
}