import styles from './TitleSection.module.css'

export default function TitleSection({title}){
    return(
        <div className={styles.confg_title_section_box}>
            <div className={styles.stroke} style={{justifyContent: 'flex-end'}}></div>
            <h4>{title}</h4>
            <div className={styles.stroke}></div>
        </div>
    )
}