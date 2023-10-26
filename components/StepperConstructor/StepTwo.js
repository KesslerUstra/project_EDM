"use client"

import { useState } from 'react';
import styles from './StepTwo.module.css';

import InputSimple from '../Input/InputSimple';
import TitleSection from '../TitleSection';
import SwitchButton from '../Buttons/SwitchButton';
import StepperControls from '../StepperControls';

import { validateFunction } from '@/public/functions/transformFunctions';
import { verifyValuesProblemCreate } from '@/public/functions/verifyValues';


export default function StepTwo({data, setData, sketch, setSketch, setStep}){

    const [verifications, setVerifications] = useState({});

    function setObjectiveFunction(type, value){
        setSketch(prev => ({...prev, [type]: value}));
    }

    function createFunction() {
        let verificationObjective = validateFunction(sketch?.objective, data?.data?.dimension?.value);
        setVerifications(prev => ({...prev, objective: verificationObjective }))
        if(verificationObjective.success === true){
            setData(prev => ({...prev, 'objectiveFunction': {function: verificationObjective.funcao}}));
        }
    };

    function toggleRestricionsValues(value){
        return;
        setData(prev => ({...prev, restrictions: { ...prev?.restrictions, active: value}}));
    }

    function controlStepper(direction){
        console.log(direction)
        try {
            if(direction === 'prev'){
                setStep(0);
                return;
            }
            console.log(`teste`,verifications)
            if(!verifications?.objective?.success && data?.objectiveFunction?.function === undefined){
                setVerifications(prev => ({...prev, objective: {...prev?.objective, error: 'Função obrigátoria'}}))
                return;
            };
            let verificationsStep = verifyValuesProblemCreate('step_two', data);
            setVerifications(prev => ({...prev, verificationsStep}));
            console.log(verificationsStep)
            if(Object.keys(verificationsStep).length !== 0 ) return;
            setStep(2);
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    return(
        <>
            <TitleSection title={'Função Objetivo'} />
            <div className={styles.confg_function_box}>
                <InputSimple value={sketch?.objective} style={{maxWidth: '700px'}} label={'Função Objetivo'} onChange={(e) => setObjectiveFunction('objective', e.target.value)} type={'text'} verification={verifications.objective?.error} positive={verifications.objective?.success}/>
                <span className={styles.error_message}>
                    {verifications.objective?.error != undefined &&
                        verifications.objective?.error
                    }
                </span>
                <button onClick={createFunction} className={styles.button_add}>Adicionar</button>
            </div>
            <TitleSection title={'Restrições'} />
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <SwitchButton initial={data?.restrictions?.active} onChangeFunction={toggleRestricionsValues}/>
            </div>
            <div className={styles.restriction_box} style={data?.restrictions?.active ? {} : {pointerEvents: 'none'}}>
                <div className={styles.restriction_type_box}>
                    <span>Variável</span>
                    <SwitchButton />
                    <span>Restrição</span>
                </div>
                <InputSimple disabled={!data?.restrictions?.active} label={'Nome Variável'} type={'text'}/>
                <InputSimple disabled={!data?.restrictions?.active} style={{maxWidth: '700px'}} label={'Função'} onChange={(e) => changeData('dimension', e.target.value)} type={'text'}/>
                <button style={{width: 'fit-content', justifySelf: 'center'}} className={styles.button_add}>Adicionar</button>
                <div className={styles.historic_restricions_box}>
                    <h5>Histórico</h5>
                </div>
            </div>
            <StepperControls step={1} onChangeStep={(e) => controlStepper(e)} />
        </>
    )
}