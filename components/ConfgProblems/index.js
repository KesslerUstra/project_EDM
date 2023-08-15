"use client"

import InputSimple from "../Input/InputSimple";
import InputLimits from "../Input/InputLimits";
import styles from "./ConfgProblems.module.css";

function ConfgProblems({confgData, setData, confgLimits, setLimits}){

    console.log(confgData);

    function changeData(type, value, flag){
        if(flag){
            setData(prev => ({...prev, [type]: {...prev[type], value: parseInt(value) ? parseInt(value) : 0}}));
        }
        setData(prev => ({...prev, [type]: parseInt(value) ? parseInt(value) : 0}));
    }

    function changeDataLimits(type, idx, value){
        setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseInt(value) !== NaN ? parseInt(value) : null}}));
    }


    return(
        <div className={styles.confg_problem_box}>
            <InputSimple value={confgData?.dimension?.value} disabled={confgData?.dimension?.disabled} letter={'n'} label={'Dimensão'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
            <InputSimple letter={'p'} label={'Número Conjunto'} onChange={(e) => changeData('groups', e.target.value)} type={'number'}/>
            <InputSimple letter={'m'} label={'Número de Pontos'} min={4} onChange={(e) => changeData('points', e.target.value)} type={'number'}/>
            <InputLimits dimesion={2} onChangeLimits={changeDataLimits} />
            <InputSimple letter={'Gmax'} label={'Número Gerações'} onChange={(e) => changeData('generations', e.target.value)} type={'number'}/>
            <InputSimple label={'Método Parada'} onChange={(e) => changeData('stop', e.target.value)} type={'number'}/>
        </div>
    )
}

export default ConfgProblems;