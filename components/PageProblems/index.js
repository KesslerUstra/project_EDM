"use client"

import { useState, useMemo } from 'react';
import ConfgProblems from '../ConfgProblems';
import ResultProblems from '../ResultProblems';
import BackButton from '../Buttons/BackButton';

import {problems as confgProblemsJson} from '@/app/assets/confg_problems';
import styles from './PageProblems.module.css';

import { runningAlgorithm } from '@/public/functions/edm/base';
import { verifyValuesConfiguration } from '@/public/functions/verifyValues';
import Loading from '@/app/problems/[problemHeader]/loading';

function PageProblems({confg = undefined}){

    const problemSelect = useMemo(() => {
        return confgProblemsJson[confg]
    }, [confg])
    
    const [data, setData] = useState(problemSelect?.data);
    const [limits, setLimits] = useState({});
    const [advanced, setAdvanced] = useState({});
    const [loading, setLoading] = useState(false);
    const [verifications, setVerifications] = useState({});
    const [results, setResults] = useState([]);

    function setResultFunction(result){
        setLoading(false);
        setResults(result);
    }

    function loadingRunning(value){
        console.log(value);
        if (value > 100){
            setLoading(100)
            return;
        }
        setLoading(value)
    }

    async function run(){
        try {
            let verification = verifyValuesConfiguration(data, limits, advanced);
            setVerifications(verification);
            if(Object.keys(verification).length !== 0 ) return;
            await runningAlgorithm(confg, data, limits, advanced.active ? advanced : {}, problemSelect?.restrictions?.active ? problemSelect?.restrictions : {}, setResultFunction, loadingRunning);
        } catch (error) {
            setLoading(false);
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    function defaultValues(){
        setData(problemSelect.default.data);
        setLimits(problemSelect.default.limits);
    }

    return(
        <div className={styles.page_problem_box}>
            <BackButton />
            {problemSelect ? 
            <>
                <h2 className={styles.title_problem}>{problemSelect.title}</h2>
                <div className={styles.confg_title_box}>
                    <div className={styles.stroke} style={{justifyContent: 'flex-end'}}></div>
                    <h4>Configurações</h4>
                    <div className={styles.stroke}></div>
                </div>
                <ConfgProblems defaultFunction={defaultValues} confgData={data} setData={setData} confgLimits={limits} setLimits={setLimits} confgAdvanced={advanced} setAdvanced={setAdvanced} verification={verifications} />
                <div className={styles.button_run_box}>
                    
                    <button style={loading ? {pointerEvents: 'none'} : {}} onClick={() => run()}>
                        {loading ?
                            <>
                                <div className={styles.running_button}>
                                    <span>{`${loading}%`}</span>
                                    <div style={{width: `${loading}%`}}></div>
                                </div>
                            </>
                        :
                            <span>Calcular</span>
                        }
                    </button>
                </div>
                <div className={styles.confg_title_box}>
                    <div className={styles.stroke} style={{justifyContent: 'flex-end'}}></div>
                    <h4>Resultados</h4>
                    <div className={styles.stroke}></div>
                </div>
                <ResultProblems generations={results} data={data} />
            </>
            :
            <>
                <div className={styles.not_found_box}>
                    <span>Problema Não Listado</span>
                </div>
            </>
            }
        </div>
    )
}

export default PageProblems;