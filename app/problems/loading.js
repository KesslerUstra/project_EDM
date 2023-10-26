import styles from './loading.module.css';
import '@/public/css/loading.css';
export default function Loading(){
    return(
        <div className={styles.loading_page_box}>
            <div className={`${styles.title_loading} skeleton`}></div>
            <div className={`${styles.options_loading} skeleton`}></div>
            <div className={styles.type_problem}>
                <div className={`${styles.label_type} skeleton`}></div>
                <div className={`${styles.stroke_type} skeleton`}></div>
            </div>
            <div className={styles.problem_list}>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
                <div className={`${styles.problem_card} skeleton`}></div>
            </div>
        </div>
    )
}