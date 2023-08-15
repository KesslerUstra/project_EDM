"use client"

import styles from './InputSimple.module.css';

export default function InputSimple({letter, style = {}, label = undefined, type, min = undefined, disabled = false, value = undefined, onChange, limit = undefined}){
    return(
        <div className={styles.input_box} style={style}>
            <div className={styles.header_input_box}>
                <div className={styles.label_box}>
                    {letter &&
                        <span className={styles.letter_label}>{`(${letter})`}</span>
                    }
                    <span style={limit ? {fontSize: '12px'} : {}}>{label}</span>
                </div>
                {min && (
                    <span className={styles.min_label}>{`min: ${min}`}</span>
                )}
            </div>
            {value ? (
                <input style={{color: 'var(--color-stroke)', background: '#d9d9d9aa'}} className={styles.input} disabled={disabled} value={value} type={type} />   
            ) : (
                <input className={styles.input} disabled={disabled} onChange={e => onChange(e)} type={type} />   
            )}
        </div>
    )
}