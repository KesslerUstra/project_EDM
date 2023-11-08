"use client"

import styles from './StepFunction.module.css';

import { useState } from 'react';
import { validateFunction } from '@/public/functions/transformFunctions';
import { verifyValuesProblemCreate } from '@/public/functions/verifyValues';
import useProblemContext from '@/hooks/useProblemContext';

import InputSimple from '../Input/InputSimple';
import TitleSection from '../TitleSection';
import SwitchButton from '../Buttons/SwitchButton';
import StepperControls from '../StepperControls';


export default function StepFunction({step = 0}){

    const [verifications, setVerifications] = useState({});
    const {state, dispatch} = useProblemContext();

    function setObjectiveFunction(type, value){
        dispatch({type: 'changeData', payload: {type: 'sketch', field: type, value: value}});
    }

    function createFunction() {
        let verificationObjective = validateFunction(state.sketch?.objective, state.data?.dimension);
        setVerifications(prev => ({...prev, objective: verificationObjective }))
        if(verificationObjective.success === true){
            dispatch({type: 'changeData', payload: {type: 'data', field: 'objectiveFunction', value: state?.sketch['objective']}});
        }
    };

    function toggleRestricionsValues(value){
        return;
    }

    function controlStepper(direction){
        try {
            if(direction === 'prev'){
                dispatch({type: 'changeStep', payload: {value: step - 1}})
                return;
            }
            if(!verifications?.objective?.success && state.data?.objectiveFunction === undefined){
                setVerifications(prev => ({...prev, objective: {...prev?.objective, error: 'Função obrigátoria'}}))
                return;
            };
            let verificationsStep = verifyValuesProblemCreate('step_two', {});
            setVerifications(prev => ({...prev, verificationsStep}));
            if(Object.keys(verificationsStep).length !== 0 ) return;
            dispatch({type: 'changeStep', payload: {value: step + 1}})
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    return(
        <>
            <TitleSection title={'Função Objetivo'} />
            <div className={styles.confg_function_box}>
                <InputSimple value={state.sketch?.objective} style={{maxWidth: '700px'}} label={'Função Objetivo'} onChange={(e) => setObjectiveFunction('objective', e.target.value)} type={'text'} verification={verifications.objective?.error} positive={verifications.objective?.success}/>
                <span className={styles.error_message}>
                    {verifications.objective?.error != undefined &&
                        verifications.objective?.error
                    }
                </span>
                <button onClick={createFunction} className={styles.button_add}>Adicionar</button>
            </div>
            <TitleSection title={'Restrições'} />
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <SwitchButton initial={state.restrictions?.active} onChangeFunction={toggleRestricionsValues}/>
            </div>
            <div className={styles.restriction_box} style={state.restrictions?.active ? {} : {pointerEvents: 'none'}}>
                <div className={styles.restriction_type_box}>
                    <span>Variável</span>
                    <SwitchButton />
                    <span>Restrição</span>
                </div>
                <InputSimple disabled={!state.restrictions?.active} label={'Nome Variável'} type={'text'}/>
                <InputSimple disabled={state.restrictions?.active} style={{maxWidth: '700px'}} label={'Função'} onChange={(e) => changeData('dimension', e.target.value)} type={'text'}/>
                <button style={{width: 'fit-content', justifySelf: 'center'}} className={styles.button_add}>Adicionar</button>
                <div className={styles.historic_restricions_box}>
                    <h5>Histórico</h5>
                </div>
            </div>
            <StepperControls step={step} onChangeStep={(e) => controlStepper(e)} />
        </>
    )
}