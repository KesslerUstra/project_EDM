import React from "react";
import StepperControls from "../StepperControls";
import TitleSection from "../TitleSection";
import styles from "./StepThree.module.css";
import { addNewRoute } from "@/app/assets/routes";
import { addConfgProblems } from "@/app/assets/confg_problems";
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { useRouter } from "next/navigation";


export default function StepThree({data, setData, sketch, setStep}){

    const router = useRouter();

    function defaultValuesPrint(){
        return(
            <>
                <div className={styles.revision_line_box}>
                    <span className={styles.title_line_1}>Valores Padrão:</span>
                </div>
                <div className={styles.revision_column_box_2}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Quantidade Subpopulação:</span>
                        <span>{data?.default?.data?.groups}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Quantidade Indivíduos:</span>
                        <span>{data?.default?.data?.points}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Gerações por Loop:</span>
                        <span>{data?.default?.data?.generations}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Limites:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        {[...Array(data?.data?.dimension?.value).keys()].map( (e, i) => 
                            <div key={i} className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>x{i}:</span>
                                <span>({data?.default?.limits?.[i]?.inferior_limit}, {data?.default?.limits?.[i]?.upper_limit})</span>
                            </div>
                        )}
                        
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Método de Parada:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        {
                            data?.default?.data?.stop?.genActive && 
                            <div className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>Geração:</span>
                                <span>{data?.default?.data?.stop?.genValue}</span>
                            </div>
                        }
                        {
                            data?.default?.data?.stop?.diffActive && 
                            <div className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>Diferença:</span>
                                <span>{data?.default?.data?.stop?.diffValue}</span>
                            </div>
                        }
                    </div>
                </div>
            </>
        );
    }

    function restrictionsPrint(){
        return(
            <>
                <div className={styles.revision_line_box}>
                    <span className={styles.title_line_1}>Restrições:</span>
                </div>
                <div className={styles.revision_column_box_2}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Variável:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        <div className={styles.revision_line_box}>
                            <span className={styles.title_line_3}>g:</span>
                            <span>4000</span>
                        </div>
                        <div className={styles.revision_line_box}>
                            <span className={styles.title_line_3}>b:</span>
                            <span>g - 5000</span>
                        </div>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Função Restrição:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        <div className={styles.revision_line_box}>
                            <span className={styles.title_line_3}>g(1):</span>
                            <span>x1 - 50</span>
                        </div>
                        <div className={styles.revision_line_box}>
                            <span className={styles.title_line_3}>g(2):</span>
                            <span>x2 + 10 - x1</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    async function controlStepper(direction){
        console.log(direction)
        try {
            if(direction === 'prev'){
                setStep(1);
                return;
            }
            
            const urlProblem = uuidv4();
            const dataModify = cloneDeep(data);
            dataModify.data.dimension.disabled = true;
            console.log(dataModify)
            addNewRoute({
                name: data.title,
                href: `/problems/${urlProblem}`,
                dimension: dataModify.data.dimension.value,
                restriction: false,
                id: urlProblem
            })
            addConfgProblems(dataModify, urlProblem);
            router.push('/problems');
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    return(
        <>
            <TitleSection title={'Revisão'} />
            <div className={styles.revision_global_box}>
                <div className={styles.revision_column_box_1}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_1}>Nome Problema:</span>
                        <span>{data?.title}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_1}>Dimensão:</span>
                        <span>{data?.data?.dimension?.value}</span>
                    </div>
                    { data?.default?.active && defaultValuesPrint() }
                </div>
                <div className={styles.revision_column_box_1}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_1}>Função Objetivo:</span>
                        <span>{sketch?.objective}</span>
                    </div>
                    { data?.restrictions?.active && restrictionsPrint() }
                </div>
            </div>
            <StepperControls step={2} onChangeStep={controlStepper} finish={true} />
        </>
    )
}