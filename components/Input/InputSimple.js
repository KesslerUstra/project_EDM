"use client"

import styles from './InputSimple.module.css';

export default function InputSimple({letter, placeholder = '', style = {}, label = undefined, type, rule = undefined, disabled = false, value = undefined, onChange, limit = undefined, stop = undefined, verification = false, positive = undefined}){
    return(
        <div className={styles.input_box} style={style}>
            <div style={ stop ? {display: `none`} : {}} className={styles.header_input_box}>
                <div className={styles.label_box}>
                    {letter &&
                        <span className={styles.letter_label}>{`(${letter})`}</span>
                    }
                    <span style={limit ? {fontSize: '13px'} : {}}>{label}</span>
                </div>
                {rule && (
                    <span className={styles.min_label}>{rule}</span>
                )}
            </div>
            <input placeholder={placeholder} style={disabled ? {color: 'var(--color-stroke)', background: '#d9d9d9aa'} : {}} className={`${styles.input} ${verification ? styles.error : ''} ${positive ? styles.passed : ''}`} disabled={disabled} onChange={e => onChange(e)} value={(value != undefined  || value != null) ? value : ''} type={type} />   
        </div>
    )
}