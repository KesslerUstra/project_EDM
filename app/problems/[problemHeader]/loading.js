import styles from './loading.module.css';
import '@/public/css/loading.css';
export default function Loading(){
    return(
        <div className={styles.loading_page_box}>
            <div className={`${styles.title_loading} skeleton`}></div>
            <div className={`${styles.options_loading} skeleton`}></div>
            <div className={styles.confg_loading}>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`} style={{width: '92px'}}></div>
                    <div className={`${styles.input_loading} skeleton`}></div>
                </div>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`}></div>
                    <div className={`${styles.input_loading} skeleton`}></div>
                </div>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`} style={{width: '94px'}}></div>
                    <div className={`${styles.input_loading} skeleton`}></div>
                </div>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`} style={{marginBottom: '18px', width: '74px'}}></div>
                    <div className={styles.loading_limits_box}>
                        <div className={`${styles.limits_loading} skeleton`}></div>
                        <div className={`${styles.limits_loading} skeleton`}></div>
                    </div>
                </div>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`} style={{width: '112px'}}></div>
                    <div className={`${styles.input_loading} skeleton`}></div>
                </div>
                <div className={styles.loading_input_box}>
                    <div className={`${styles.label_loading} skeleton`} style={{marginBottom: '18px'}}></div>
                    <div className={`${styles.limits_loading} skeleton`}></div>
                </div>
            </div>
            <div className={`${styles.button_loading} skeleton`}></div>
            <div className={styles.loading_result_box}>
                <div className={styles.loading_values_default_box}>
                    <div className={styles.loading_result_subbox}>
                        <div className={`${styles.loading_values_default_label} skeleton`}></div>
                        <div className={`${styles.loading_values_default} skeleton`}></div>
                    </div>
                    <div className={styles.loading_result_subbox}>
                        <div className={`${styles.loading_values_default_label} skeleton`}></div>
                        <div className={`${styles.loading_values_default} skeleton`}></div>
                    </div>
                </div>
                <div className={styles.loading_result_subbox} style={{flex: '1', maxWidth: '800px'}}>
                    <div className={`${styles.loading_values_default_label} skeleton`}></div>
                    <div  className={`${styles.loading_graph} skeleton`}></div>
                </div>
            </div>
        </div>
    )
}