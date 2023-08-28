"use client"

import { useState } from 'react';
import ConfgProblems from '../ConfgProblems';
import ResultProblems from '../ResultProblems';
import BackButton from '../BackButton';
import ReactLoading from 'react-loading';

import confgProblemsJson from '@/app/assets/json/confg_problems.json';
import styles from './PageProblems.module.css';

import { runningAlghoritm } from '@/public/functions/edm/base';

function PageProblems({confg = undefined}){

    const problemSelect = confgProblemsJson[confg]
    
    const [data, setData] = useState(problemSelect.data);
    const [limits, setLimits] = useState({});
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({});

    async function run(){
        try {
            setLoading(true);
            const result = await runningAlghoritm(data, limits);
            setResults(result)

            // const worker = new Worker("/functions/edm/edmWorker.js", { type: "module" });
    
            // worker.onmessage = (e) => {
            //     if (e.data.type === "algorithmResult") {
            //         setResults(e.data.payload);
            //         setLoading(false);
            //     }
            // };
            
            // worker.postMessage({ type: "runAlgorithm", payload: { data, limits } });
            
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
                <ConfgProblems defaultFunction={defaultValues} confgData={data} setData={setData} confgLimits={limits} setLimits={setLimits} />
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
            <></>
            }
        </div>
    )
}

export default PageProblems;