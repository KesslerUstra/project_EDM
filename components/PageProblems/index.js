"use client"

import { useState, useMemo, useEffect } from 'react';
import ConfgProblems from '../ConfgProblems';
import ResultProblems from '../ResultProblems';
import BackButton from '../Buttons/BackButton';
import Loading from '@/app/problems/[problemHeader]/loading';

import {problems as confgProblemsJson} from '@/app/assets/confg_problems';
import { getConfgProblems } from '@/app/assets/confg_problems';
import styles from './PageProblems.module.css';

import { runningAlgorithm } from '@/public/functions/edm/base';
import { verifyArrays } from '@/public/functions/verification/verifyValues';

function PageProblems({confgId = undefined}){

    console.log(confgId)

    const [problemSelect, setProblemSelect] = useState(null);
    const [data, setData] = useState({});
    const [limits, setLimits] = useState({});
    const [advanced, setAdvanced] = useState({});
    const [loading, setLoading] = useState(false);
    const [verifications, setVerifications] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let problemData = confgProblemsJson[confgId];
                if (problemData === undefined) {
                    problemData = await getConfgProblems(confgId);
                }
                console.log(problemData)
                setProblemSelect(problemData);
            } catch (error) {
                console.error('Erro ao buscar dados do problema:', error);
            }
        };
        fetchData();
    }, [confgId]);

    function setResultFunction(result){
        setLoading(false);
        setResults(result);
    }

    function loadingRunning(value){
        if (value > 100){
            setLoading(100)
            return;
        }
        setLoading(value)
    }

    async function run(){
        try {
            console.log(data, limits, advanced, problemSelect?.dimension);
            let verification = verifyArrays('verifications_run', {...data, dimension: problemSelect?.dimension, limits: limits, advanced: advanced});
            setVerifications(verification);
            console.log(verification)
            if(Object.keys(verification).length !== 0 ) return;
            await runningAlgorithm(problemSelect?.objectiveFunction? problemSelect?.objectiveFunction : confgId, problemSelect?.dimension, data, limits, advanced.active ? advanced : {}, problemSelect?.restrictions?.active ? problemSelect?.restrictions : {}, setResultFunction, loadingRunning);
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
        <>
        {problemSelect === null ? 
            <Loading />
        :
            <div className={styles.page_problem_box}>
                <BackButton activeClear={true} />
                {problemSelect ?
                <>
                    <h2 className={styles.title_problem}>{problemSelect.title}</h2>
                    <div className={styles.confg_title_box}>
                        <div className={styles.stroke} style={{justifyContent: 'flex-end'}}></div>
                        <h4>Configurações</h4>
                        <div className={styles.stroke}></div>
                    </div>
                    <ConfgProblems defaultFunction={defaultValues} confgData={data} setData={setData} confgLimits={limits} setLimits={setLimits} confgAdvanced={advanced} setAdvanced={setAdvanced} verification={verifications} problemFields={problemSelect} />
                    <div className={styles.button_run_box}>
                        
                        <button style={loading ? {pointerEvents: 'none'} : {}} onClick={run}>
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
                    <ResultProblems generations={results} data={data} dimension={problemSelect?.dimension}/>
                </>
                :
                    <>
                        {
                            problemSelect === null ?
                            <>
                                
                            </>
                            :
                            <>
                                <div className={styles.not_found_box}>
                                    <span>Problema Não Listado</span>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        }
        </>
    )
}

export default PageProblems;