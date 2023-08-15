"use client"

import { useState } from 'react';
import ConfgProblems from '../ConfgProblems';
import ResultProblems from '../ResultProblems';
import BackButton from '../BackButton';

import confgProblemsJson from '@/app/assets/json/confg_problems.json';
import styles from './PageProblems.module.css';

import { runningAlghoritm } from '@/app/functions/edm/base';

function PageProblems({confg = undefined}){

    const problemSelect = confgProblemsJson[confg]
    
    const [data, setData] = useState(problemSelect.data);
    const [limits, setLimits] = useState({});
    const [bestPoint, setBestPoint] = useState({});

    async function run(){
        let result = await runningAlghoritm(data, limits);
        console.log('final', result);
        setBestPoint(result[0]);
    }

    console.log(bestPoint)

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
                <ConfgProblems confgData={data} setData={setData} confgLimits={limits} setLimits={setLimits} />
                <div className={styles.button_run_box}>
                    <button onClick={(e) => run()}><span>Calcular</span></button>
                </div>
                <div className={styles.confg_title_box}>
                    <div className={styles.stroke} style={{justifyContent: 'flex-end'}}></div>
                    <h4>Resultados</h4>
                    <div className={styles.stroke}></div>
                </div>
                <ResultProblems point={bestPoint} />
            </>
            :
            <></>
            }
        </div>
    )
}

export default PageProblems;