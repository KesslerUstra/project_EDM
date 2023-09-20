"use client"

import React from "react";
import InputSimple from "../Input/InputSimple";
import InputLimits from "../Input/InputLimits";
import InputStop from "../Input/InputStop";
import InputAdvanced from "../Input/InputAdvanced";
import styles from "./ConfgProblems.module.css";
import { HiDocument } from "react-icons/hi2";
import AnimateHeight from 'react-animate-height';

function ConfgProblems({defaultFunction, confgData, setData, confgLimits, setLimits, confgAdvanced, setAdvanced, verification}){

    function changeData(type, value, flag){
        if(flag){
            setData(prev => ({...prev, [type]: {...prev[type], value: parseInt(value) ? parseInt(value) : 0}}));
        }
        setData(prev => ({...prev, [type]: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0}));
    }

    function changeDataLimits(type, idx, value){
        setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : null}}));
    }

    function changeDataStop(type, value){
        if(type.includes('Active')){
            setData(prev => ({...prev, stop: {...prev?.stop, [type]: !prev?.stop?.[type]}}));
            return;
        }
        setData(prev => ({...prev, stop: {...prev?.stop, [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : 0}}));
    }

    function changeDataAdvanced(type, value){
        if(type.includes('crossove_exp')){
            setAdvanced(prev => ({...prev, [type]: value}));
            return;
        }
        setAdvanced(prev => ({...prev, [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : 0}));
    }

    function activeAdvancedConfg(value){
        setAdvanced(prev => ({...prev, active: value}));
    }

    return(
        <>
            <div className={styles.toggle_confg_box}>
                <div className={styles.toggle_box}>
                    <div className={`${styles.button}`}>
                        <input onChange={(e) => activeAdvancedConfg(e.target.checked)} type="checkbox" className={styles.checkbox} />
                        <div className={styles.knobs}>
                        </div>
                        <div className={styles.layer}></div>
                    </div>
                    <span>Opções Avançadas</span>
                </div>
                <div onClick={() => defaultFunction()} className={styles.button_default_values}>
                    <span>Valores Padrão</span>
                    <div><HiDocument /></div>
                </div>
            </div>
            <div className={styles.confg_problem_box}>
                <InputSimple verification={verification.dimension} value={confgData?.dimension?.value} disabled={confgData?.dimension?.disabled} letter={'n'} label={'Dimensão'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
                <InputSimple verification={verification.groups} value={confgData?.groups} letter={'p'} label={'Quantidade Subpopulação'} onChange={(e) => changeData('groups', e.target.value)} type={'number'}/>
                <InputSimple verification={verification.points} value={confgData?.points} letter={'m'} label={'Quantidade Indivíduos'} rule={'min: 4'} onChange={(e) => changeData('points', e.target.value)} type={'number'}/>
                <InputLimits values={confgLimits} dimesion={confgData.dimension.value} onChangeLimits={changeDataLimits} verification={verification.limits} />
                <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <InputSimple verification={verification.generations} value={confgData?.generations} letter={'Gmax'} label={'Gerações por Loop'} onChange={(e) => changeData('generations', e.target.value)} type={'number'}/>
                    <AnimateHeight
                        duration={500}
                        height={confgAdvanced?.active ? 'auto' : 0}
                        animateOpacity={true}>
                            <InputAdvanced verifications={verification.advanced} advancedConfg={confgAdvanced} onChangeAdvanced={changeDataAdvanced} />
                    </AnimateHeight>
                </div>
                <InputStop verifications={verification.stop} stopConfg={confgData.stop} onChangeStop={changeDataStop}/>
            </div>
        </>
    )
}

export default ConfgProblems;