import styles from './SwitchButton.module.css';

export default function SwitchButton({onChangeFunction, initial = false}){
    return(
        <div className={`${styles.button}`}>
            <input onChange={(e) => onChangeFunction(e.target.checked)} defaultChecked={initial} type="checkbox" className={styles.checkbox} />
            <div className={styles.knobs}></div>
            <div className={styles.layer}></div>
        </div>
    )
}