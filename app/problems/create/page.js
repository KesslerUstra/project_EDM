'use client'

import styles from './page.module.css';

import StepperCount from '@/components/StepperCount';
import BackButton from '@/components/Buttons/BackButton';
import StepperConstructor from '@/components/StepperConstructor';

import { useState } from "react"
import InputSimple from "@/components/Input/InputSimple";
import InputLimits from "@/components/Input/InputLimits";
import { runningAlgorithm } from "@/public/functions/edm/base";
import { addConfgProblems } from '@/app/assets/confg_problems';
import { v4 as uuidv4 } from 'uuid';

import { addNewRoute } from '@/app/assets/routes';
import { cloneDeep } from 'lodash';

export default function CreateProblems() {

    // const [data, setData] = useState({
    //     "generations": 10,
    //     "groups": 10,
    //     "points": 12,
    //     "stop": {
    //         "genActive": true,
    //         "genValue": 10
    //     }
    // });
    const [limits, setLimits] = useState({});
    const [functionProblem, setFunctionProblem] = useState(null);
    const [functionText, setFunctionText] = useState('');
    const [result, setResult] = useState(null);

    const [stepper, setStepper] = useState(0);
    const [data, setData] = useState({"default": {active: true}});
    const [sketch, setSketch] = useState({});
    console.log(data);
    console.log(sketch);

    console.log(result)
    console.log(limits)

    function setResultFunction(result){
        setResult(result);
    }

    function calculate() {
        const generatedFunction = new Function(`data`, `return(${functionText})`);
        setFunctionProblem({function: generatedFunction});
    };

    function changeData(type, value){
        setData(prev => ({...prev, [type]: {...prev[type], value: parseInt(value) ? parseInt(value) : 0}}));
    }

    function changeDataLimits(type, idx, value){
        setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseFloat(value) !== NaN ? (value === "" ? "" : parseFloat(value)) : null}}));
        return ``;
    }

    function loadingRunning(value){
        console.log(value);
    }

    async function run(){
        try {
            await runningAlgorithm(functionProblem, data, limits, {}, {}, setResultFunction, loadingRunning);
        } catch (error) {
            setLoading(false);
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    function finishCreateProblem(){
        const urlProblem = uuidv4()
        const dataModify = cloneDeep(data);
        console.log(data.objectiveFunction)
        console.log(dataModify.objectiveFunction)
        dataModify.data.dimension.disabled = true;
        dataModify.default.data.dimension = {value: data.data.dimension.value, disabled: true};
        addNewRoute({
            name: data.title,
            href: `/problems/${urlProblem}`
        })
        addConfgProblems(dataModify, urlProblem);
    }

    return (
        <div className={styles.page_create_box}>
            <BackButton />
            <h2 name="top" className={styles.title_page}>Construtor de Problema</h2>
            <StepperCount steps={3} stepActive={stepper}/>
            <StepperConstructor step={stepper} setStep={setStepper} data={data} setData={setData} sketch={sketch} setSketch={setSketch} finishFunction={finishCreateProblem}/>
            
            {/* <button onClick={() => setStepper(prev => prev+1)}>adicionar</button>
            <button onClick={() => setStepper(prev => prev-1)}>remover</button>
            <InputSimple value={data?.dimension?.value} letter={'n'} label={'Dimensão'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
            <InputLimits values={limits} dimesion={data?.dimension?.value} onChangeLimits={changeDataLimits} />
            <input type="text" onChange={(e) => setFunctionText(e.target.value)} />
            <button onClick={() => calculate()}>Criar Funcao</button>
            <div>
                <button onClick={() => run()}>Calcular</button>
            </div> */}
        </div>
    )
}