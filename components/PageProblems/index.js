"use client"

import { useState, useMemo } from 'react';
import ConfgProblems from '../ConfgProblems';
import ResultProblems from '../ResultProblems';
import BackButton from '../Buttons/BackButton';
import ReactLoading from 'react-loading';

import {problems as confgProblemsJson} from '@/app/assets/confg_problems';
import styles from './PageProblems.module.css';

import { runningAlgorithm } from '@/public/functions/edm/base';
import { verifyValuesConfiguration } from '@/public/functions/verifyValues';

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

    async function run(){
        try {
            setLoading(true);
            let verification = verifyValuesConfiguration(data, limits, advanced);
            console.log('verification', verification);
            setVerifications(verification);
            if(Object.keys(verification).length !== 0 ) return;
            const result = await runningAlgorithm(confg, data, limits, advanced.active ? advanced : {}, problemSelect?.restrictions?.active ? problemSelect?.restrictions : {});
            setResults(result)
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }finally{
            setLoading(false);
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
                                <ReactLoading className={styles.loading_button_run} type={'bubbles'} color="#fff" height={38} width={38} />
                                <span style={{opacity: 0}}>Calcular</span>
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