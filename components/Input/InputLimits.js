"use client"

import React from 'react';
import styles from './InputLimits.module.css';
import InputSimple from './InputSimple';

export default function InputLimits({dimesion = 0, onChangeLimits}){
    return(
        <div className={styles.input_limits_box}>
            <div className={styles.header_box}>
                <div className={styles.label_box}>
                        <span className={styles.letter_label}>(L)</span>
                    <span>Limites</span>
                </div>
            </div>
            <div className={styles.confg_limits_box}>
                {[...Array(dimesion).keys()].map( (e,i) =>
                    <div key={i} className={styles.x_limit_box}>
                        <div style={{gridArea: 'stroke1'}} className={styles.stroke_limit_inferior}></div>
                        <div className={styles.label_variable} style={{gridArea: 'variable'}}>{`x${i+1}`}</div>
                        <div style={{gridArea: 'stroke2'}} className={styles.stroke_limit_upper}></div>
                        <InputSimple style={{gridArea: 'input1'}} label={`Inferior`} onChange={(e) => onChangeLimits('inferior_limit', i, e.target.value)} type={'number'} limit={true}/>
                        <InputSimple style={{gridArea: 'input2'}} label={`Superior`} onChange={(e) => onChangeLimits('upper_limit', i, e.target.value)} type={'number'} limit={true}/>
                    </div>
                )}
            </div>
        </div>
    )
}