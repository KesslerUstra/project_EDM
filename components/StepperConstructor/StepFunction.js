"use client"

import styles from './StepFunction.module.css';

import { useState } from 'react';
import { validateFunction } from '@/public/functions/verification/transformFunctions';
import { verifyArrays } from '@/public/functions/verification/verifyValues';
import useProblemContext from '@/hooks/useProblemContext';

import InputSimple from '../Input/InputSimple';
import TitleSection from '../TitleSection';
import SwitchButton from '../Buttons/SwitchButton';
import StepperControls from '../StepperControls';
import DrawerProblem from '../Drawer/DrawerProblem';


export default function StepFunction({step = 0}){

    const [verifications, setVerifications] = useState({});
    const [variable, setVariable] = useState(true);
    const {state, dispatch} = useProblemContext();
    console.log(state)

    function setSketchFunction(type, value){
        dispatch({type: 'changeData', payload: {type: 'sketch', field: type, value: value}});
    }

    function createFunction() {
        let verificationObjective = validateFunction(state.sketch?.objective, state.data?.dimension);
        setVerifications(prev => ({...prev, objective: verificationObjective }))
        console.log(verificationObjective)
        if(verificationObjective.success === true){
            dispatch({type: 'changeData', payload: {type: 'data', field: 'objectiveFunction', value: verificationObjective.functionFinal}});
        }
    };

    function toggleValues(value, type){
        if(type === 'variable'){
            setVariable(prev => !prev);
            return;
        }
        dispatch({type: 'toggleActive', payload: {type: 'restrictions', value: value}});
    }

    function createRestricion(){
        state.data?.restrictions
        let verificationRestriction = validateFunction(state.sketch?.objective, state.data?.dimension);
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
                <InputSimple value={state.sketch?.objective} style={{maxWidth: '700px'}} label={'Função Objetivo'} onChange={(e) => setSketchFunction('objective', e.target.value)} type={'text'} verification={verifications.objective?.error} positive={verifications.objective?.success}/>
                <span className={styles.error_message}>
                    {verifications.objective?.error != undefined &&
                        verifications.objective?.error
                    }
                </span>
                <button onClick={createFunction} className={styles.button_add}>Adicionar</button>
            </div>
            <TitleSection title={'Restrições'} />
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <SwitchButton initial={state.restrictions?.active} onChangeFunction={toggleValues}/>
            </div>
            <div className={styles.restriction_box}>
                <div className={styles.restriction_type_box}  style={state.restrictions?.active ? {} : {pointerEvents: 'none'}}>
                    <span style={variable ? {color: 'var(--color-blue-2)'} : {}}>Variável</span>
                    <SwitchButton onChangeFunction={(e) => toggleValues(e, 'variable')}/>
                    <span style={variable ? {} : {color: 'var(--color-blue-2)'}}>Restrição</span>
                </div>
                <InputSimple value={state.sketch?.variableName} disabled={!state.restrictions?.active || !variable} label={'Nome Variável'} type={'text'} onChange={(e) => setSketchFunction('variableName', e.target.value)} />
                <InputSimple value={state.sketch?.restricionFunction} disabled={!state.restrictions?.active} style={{maxWidth: '700px'}} label={'Função'} onChange={(e) => setSketchFunction('restricionFunction', e.target.value)} type={'text'}/>
                <button style={{width: 'fit-content', justifySelf: 'center', pointerEvents: state.restrictions?.active ? 'auto' : 'none'}} className={styles.button_add} onClick={createRestricion}>Adicionar</button>
                <div className={styles.historic_restricions_box}>
                    <h5>Histórico</h5>
                </div>
            </div>
            <StepperControls step={step} onChangeStep={(e) => controlStepper(e)} />
            <DrawerProblem></DrawerProblem>
        </>
    )
}