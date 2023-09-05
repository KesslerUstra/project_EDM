"use client"

import React from 'react';
import styles from './InputAdvanced.module.css';
import InputSimple from './InputSimple';

export default function InputLimits({onChangeAdvanced, advancedConfg={}, verifications = {}}){
    return(
        <div className={styles.confg_advanced_box}>
            <div className={styles.header_box}>
                <span>Confg Avançadas</span>
            </div>
            <div className={styles.inputs_advanced_box}>
                <InputSimple placeholder='1.4' limit={true} rule={'0 < x < 2'} value={advancedConfg?.disturbance_rate} label={`Taxa pertubação`} letter={'f'} onChange={(e) => onChangeAdvanced('disturbance_rate', e.target.value)} type={'number'} verification={verifications.disturbance_rate}/>
                <InputSimple placeholder='0.6' limit={true} rule={'0 < x < 1'} value={advancedConfg?.crossover_probability} label={`Probabilidade Cruzamento`} letter={'CR'} onChange={(e) => onChangeAdvanced('crossover_probability', e.target.value)} type={'number'} verification={verifications.crossover_probability}/>
                <div>
                    <span className={styles.title_crossover}>Cruzamento</span>
                    <div className={styles.inputs_crossover_box}>
                        <div className={styles.radio_crossover_box}>
                            <label htmlFor='binomial'>Binomial</label>
                            <input onChange={() => onChangeAdvanced('crossoverExp', false)} type="radio" name="crossing" id="binomial" />
                        </div>
                        <div className={styles.radio_crossover_box}>
                            <label htmlFor='exponencial'>Exponencial</label>
                            <input defaultChecked={false} onChange={() => onChangeAdvanced('crossoverExp', true)} type="radio" name="crossing" id="exponencial" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}