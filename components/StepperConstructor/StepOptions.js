"use client"

import styles from './StepOptions.module.css';

import { useState } from 'react';
import { verifyArrays } from '@/public/functions/verification/verifyValues';
import useProblemContext from '@/hooks/useProblemContext';

import InputSimple from '../Input/InputSimple';
import TitleSection from '../TitleSection';
import SwitchButton from '../Buttons/SwitchButton';
import InputLimits from '../Input/InputLimits';
import InputStop from '../Input/InputStop';
import StepperControls from '../StepperControls';


export default function StepOptions({step = 0}){

    const [verifications, setVerifications] = useState({});
    const {state, dispatch} = useProblemContext();

    function processVariable(variable, type = 'int') {
        let numericValue;
        if(type === 'float'){
            numericValue = parseFloat(variable);
        }else{
            numericValue = parseInt(variable);
        }
    
        if (!isNaN(numericValue)) {
            return numericValue;
        } else if (variable.trim() !== "") {
            return 0;
        } else {
            return "";
        }
    }

    function changeData(type, value){
        if(type === 'title'){
            dispatch({type: 'changeData', payload: {type: 'data', field: 'title', value: value}});
            return;
        }
        let valueFinal = processVariable(value);
        valueFinal = valueFinal > 10 ? 10 :valueFinal;
        
        dispatch({type: 'changeData', payload: {type: 'data', field: 'dimension', value: valueFinal}});
    }

    function toggleDefaultValues(value){
        dispatch({type: 'toggleActive', payload: {type: 'default', value: value}});
    }

    function changeDataDefault(type, value){
        let valueFinal = processVariable(value);

        dispatch({type: 'changeData', payload: {type: 'default', field: type, value: valueFinal}});
    }

    function changeLimitsDefault(type, idx, value){

        let valueFinal = processVariable(value, 'float');

        dispatch({type: 'changeLimits', payload: {idx: idx, field: type, value: valueFinal}});
    }

    function changeStopDefault(type, value){
        if(type.includes('Active')){
            dispatch({type: 'toggleState', payload: {type: 'stop', field: type}});
            return;
        }

        let valueFinal = processVariable(value, 'float');

        dispatch({type: 'changeData', payload: {type: 'stop', field: type, value: valueFinal}});
    }

    function controlStepper(){
        try {
            let verificationsStep = verifyArrays('step_options', {...state.data, default: state.default, limits: state.limits, stop: state.stop});
            setVerifications(verificationsStep);
            console.log(verificationsStep);
            if(Object.keys(verificationsStep).length !== 0 ) return;
            dispatch({type: 'changeStep', payload: {value: step + 1}})
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }


    return(
        <>
            <TitleSection title={'Confg Básicas'} />
            <div className={styles.confg_basic_box}>
                <InputSimple verification={verifications?.title} value={state.data?.title} label={'Nome do Problema'} onChange={(e) => changeData('title', e.target.value)} type={'text'}/>
                <InputSimple verification={verifications?.dimension} value={state.data?.dimension} letter={'n'} label={'Dimensão'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
                <div></div>
            </div>
            <TitleSection title={'Valores Padrão'} />
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <SwitchButton onChangeFunction={toggleDefaultValues} initial={state.default?.active} />
            </div>
            <div className={styles.default_values_box}>
                <InputSimple verification={verifications?.default?.groups} value={state.default?.groups} disabled={!state.default?.active} letter={'p'} label={'Quantidade Subpopulação'} onChange={(e) => changeDataDefault('groups', e.target.value)} type={'number'}/>
                <InputSimple verification={verifications?.default?.points} value={state.default?.points} disabled={!state.default?.active} letter={'m'} label={'Quantidade Indivíduos'} rule={'min: 4'} onChange={(e) => changeDataDefault('points', e.target.value)} type={'number'}/>
                <InputSimple verification={verifications?.default?.generations} value={state.default?.generations} disabled={!state.default?.active} letter={'Gmax'} label={'Gerações por Loop'} onChange={(e) => changeDataDefault('generations', e.target.value)} type={'number'}/>
                <InputLimits verification={verifications?.default?.limits} disabled={!state.default?.active} dimesion={state.data?.dimension} values={state.limits} onChangeLimits={changeLimitsDefault}/>
                <InputStop verifications={verifications?.default?.stop} stopConfg={state.stop} onChangeStop={changeStopDefault} disabled={!state.default?.active} />
            </div>
            <StepperControls step={step} onChangeStep={(e) => controlStepper(e)} />
        </>
    )
}