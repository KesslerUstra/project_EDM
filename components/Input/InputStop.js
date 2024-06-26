"use client"

import React from 'react';
import styles from './InputStop.module.css';
import InputSimple from './InputSimple';
import { FaCheck } from 'react-icons/fa';

export default function InputStop({stopConfg = {}, onChangeStop, verifications = {}, disabled = false}){
    return(
        <div className={styles.input_stop_box}>
            <div className={styles.header_box}>
                <div className={styles.label_box}>
                    <span>Método de Parada</span>
                </div>
            </div>
            <div className={styles.confg_stop_box}>
                <div className={styles.stop_box}>
                    <div style={{pointerEvents: disabled ? 'none' : 'auto'}} onClick={() => onChangeStop('genActive')} className={styles.header_stop}>
                        <span className={`${styles.checkbox_stop} ${stopConfg?.genActive ? styles.activeCheck : ``}`}><FaCheck /></span>
                        <h6 className={styles.label_stop}>Gerações</h6>
                    </div>
                    <InputSimple min={1} style={{gridArea: 'input1'}} label={`Inferior`} onChange={(e) => onChangeStop('genValue', e.target.value)} type={'number'} value={stopConfg?.genValue} stop={true} disabled={!stopConfg?.genActive || disabled} verification={verifications.gen}/>
                </div>
                <div className={styles.stop_box}>
                    <div style={{pointerEvents: disabled ? 'none' : 'auto'}} onClick={() => onChangeStop('diffActive')} className={styles.header_stop}>
                        <span className={`${styles.checkbox_stop} ${stopConfg?.diffActive ? styles.activeCheck : ``}`}><FaCheck /></span>
                        <h6 className={styles.label_stop}>Diferença</h6>
                    </div>
                    <InputSimple style={{gridArea: 'input1'}} label={`Inferior`} onChange={(e) => onChangeStop('diffValue', e.target.value)} type={'number'} stop={true} value={stopConfg?.diffValue} disabled={!stopConfg?.diffActive || disabled} verification={verifications.diff}/>
                </div>
            </div>
        </div>
    )
}