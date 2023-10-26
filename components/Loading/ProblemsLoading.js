import '@/public/css/loading.css';
import styles from './ProblemsLoading.module.css';

export default function ProblemsLoading(){
    return(
        <div className={styles.loading_page_box}>
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