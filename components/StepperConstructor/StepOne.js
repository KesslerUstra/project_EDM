"use client"

import { useState } from 'react';
import styles from './StepOne.module.css';

import InputSimple from '../Input/InputSimple';
import TitleSection from '../TitleSection';
import SwitchButton from '../Buttons/SwitchButton';
import InputLimits from '../Input/InputLimits';
import InputStop from '../Input/InputStop';
import StepperControls from '../StepperControls';

import { verifyValuesProblemCreate } from '@/public/functions/verifyValues';


export default function StepOne({data, setData, setStep}){

    const [verifications, setVerifications] = useState({});

    function changeData(type, value){
        if(type === 'title'){
            setData(prev => ({...prev, [type]: value}));
            return;
        }
        if(parseInt(value) > 10){
            setData(prev => ({...prev, data: { ...prev?.data, [type]: {value: 10, disabled: true}}}));
            setData(prev => ({...prev, default: { ...prev?.default, data: {...prev?.default?.data, [type]: {value: 10, disabled: true}}}}));
            return;
        }
        setData(prev => ({...prev, data: { ...prev?.data, [type]: {value: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0, disabled: true}}}));
        setData(prev => ({...prev, default: { ...prev?.default, data: {...prev?.default?.data, [type]: {value: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0, disabled: true}}}}));
    }

    function toggleDefaultValues(value){
        setData(prev => ({...prev, default: { ...prev?.default, active: value}}));
    }

    function changeDataDefault(type, value){
        setData(prev => ({...prev, default: { ...prev?.default, data: {...prev?.default?.data, [type]: parseInt(value) !== NaN ? (value === "" ? "" : parseInt(value)) : 0}}}));
    }

    function changeLimitsDefault(type, idx, value){
        setData(prev => ({...prev, default: { ...prev?.default, limits: {...prev?.default?.limits, [idx]: {...prev?.default?.limits?.[idx], [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : null}}}}));
    }

    function changeStopDefault(type, value){
        if(type.includes('Active')){
            setData(prev => ({...prev, default: { ...prev?.default, data: {...prev?.default?.data, stop: {...prev?.default?.data?.stop, [type]: !prev?.default?.data?.stop?.[type]}}}}));
            return;
        }
        setData(prev => ({...prev, default: { ...prev?.default, data: {...prev?.default?.data, stop: {...prev?.default?.data?.stop, [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : null}}}}));
    }

    function controlStepper(direction){
        try {
            let verificationsStep = verifyValuesProblemCreate('step_one', data);
            setVerifications(verificationsStep);
            if(Object.keys(verificationsStep).length !== 0 ) return;
            setStep(1);
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    return(
        <>
            <TitleSection title={'Confg Básicas'} />
            <div className={styles.confg_basic_box}>
                <InputSimple verification={verifications?.title} value={data.title} label={'Nome do Problema'} onChange={(e) => changeData('title', e.target.value)} type={'text'}/>
                <InputSimple verification={verifications?.dimension} value={data?.data?.dimension?.value} letter={'n'} label={'Dimensão'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
                <div></div>
            </div>
            <TitleSection title={'Valores Padrão'} />
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                <SwitchButton onChangeFunction={toggleDefaultValues} initial={data?.default?.active === undefined ? true : data?.default?.active} />
            </div>
            <div className={styles.default_values_box}>
                <InputSimple verification={verifications?.default?.groups} value={data?.default?.data?.groups} disabled={!data?.default?.active} letter={'p'} label={'Quantidade Subpopulação'} onChange={(e) => changeDataDefault('groups', e.target.value)} type={'number'}/>
                <InputSimple verification={verifications?.default?.points} value={data?.default?.data?.points} disabled={!data?.default?.active} letter={'m'} label={'Quantidade Indivíduos'} rule={'min: 4'} onChange={(e) => changeDataDefault('points', e.target.value)} type={'number'}/>
                <InputSimple verification={verifications?.default?.generations} value={data?.default?.data?.generations} disabled={!data?.default?.active} letter={'Gmax'} label={'Gerações por Loop'} onChange={(e) => changeDataDefault('generations', e.target.value)} type={'number'}/>
                <InputLimits verification={verifications?.limits} disabled={!data?.default?.active} dimesion={data?.data?.dimension?.value} values={data?.default?.limits} onChangeLimits={changeLimitsDefault}/>
                <InputStop verifications={verifications?.stop} stopConfg={data?.default?.data?.stop} onChangeStop={changeStopDefault} disabled={!data?.default?.active} />
            </div>
            <StepperControls step={0} onChangeStep={(e) => controlStepper(e)} />
        </>
    )
}