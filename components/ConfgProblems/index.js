"use client"

import InputSimple from "../Input/InputSimple";
import InputLimits from "../Input/InputLimits";
import InputStop from "../Input/InputStop";
import styles from "./ConfgProblems.module.css";
import { HiDocument } from "react-icons/hi2";

function ConfgProblems({defaultFunction, confgData, setData, confgLimits, setLimits, verification}){

    console.log(confgData);
    console.log(confgLimits);

    function changeData(type, value, flag){
        if(flag){
            setData(prev => ({...prev, [type]: {...prev[type], value: parseInt(value) ? parseInt(value) : 0}}));
        }
        setData(prev => ({...prev, [type]: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0}));
    }

    function changeDataLimits(type, idx, value){
        setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : null}}));
    }

    function changeDataStop(type, value){
        if(type.includes('Active')){
            setData(prev => ({...prev, stop: {...prev.stop, [type]: !prev?.stop?.[type]}}));
            return;
        }
        setData(prev => ({...prev, stop: {...prev?.stop, [type]: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0}}));
    }


    return(
        <>
            <div className={styles.toggle_confg_box}>
                <div className={styles.toggle_box}>
                    <div className={`${styles.button}`}>
                        <input type="checkbox" className={styles.checkbox} />
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
                <InputSimple verification={verification.groups} value={confgData?.groups} letter={'p'} label={'Número Conjunto'} onChange={(e) => changeData('groups', e.target.value)} type={'number'}/>
                <InputSimple verification={verification.points} value={confgData?.points} letter={'m'} label={'Número de Pontos'} min={4} onChange={(e) => changeData('points', e.target.value)} type={'number'}/>
                <InputLimits values={confgLimits} dimesion={confgData.dimension.value} onChangeLimits={changeDataLimits} verification={verification.limits} />
                <InputSimple verification={verification.generations} value={confgData?.generations} letter={'Gmax'} label={'Número Gerações'} onChange={(e) => changeData('generations', e.target.value)} type={'number'}/>
                <InputStop verifications={verification.stop} stopConfg={confgData.stop} onChangeStop={changeDataStop}/>
            </div>
        </>
    )
}

export default ConfgProblems;