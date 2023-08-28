"use client"

import styles from './InputSimple.module.css';

export default function InputSimple({letter, style = {}, label = undefined, type, min = undefined, disabled = false, value = undefined, onChange, limit = undefined, stop = undefined}){
    return(
        <div className={styles.input_box} style={style}>
            <div style={ stop ? {display: `none`} : {}} className={styles.header_input_box}>
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
            <input style={disabled ? {color: 'var(--color-stroke)', background: '#d9d9d9aa'} : {}} className={styles.input} disabled={disabled} onChange={e => onChange(e)} value={(value != undefined  || value != null) ? value : ''} type={type} />   
        </div>
    )
}