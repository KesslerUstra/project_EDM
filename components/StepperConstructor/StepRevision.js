import styles from "./StepRevision.module.css";

import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { useRouter } from "next/navigation";
import { addConfgProblems } from "@/app/assets/confg_problems";
import { addNewRoute } from "@/app/assets/routes";
import useProblemContext from "@/hooks/useProblemContext";

import StepperControls from "../StepperControls";
import TitleSection from "../TitleSection";


export default function StepRevision({step = 0}){

    const router = useRouter();
    const {state, dispatch} = useProblemContext();

    function defaultValuesPrint(){
        return(
            <>
                <div className={styles.revision_line_box}>
                    <span className={styles.title_line_1}>Valores Padrão:</span>
                </div>
                <div className={styles.revision_column_box_2}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Quantidade Subpopulação:</span>
                        <span>{state.default?.groups}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Quantidade Indivíduos:</span>
                        <span>{state.default?.points}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Gerações por Loop:</span>
                        <span>{state.default?.generations}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Limites:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        {[...Array(state.data?.dimension).keys()].map( (e, i) => 
                            <div key={i} className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>x{i}:</span>
                                <span>({state.limits?.[i]?.inferior_limit}, {state.limits?.[i]?.upper_limit})</span>
                            </div>
                        )}
                        
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_2}>Método de Parada:</span>
                    </div>
                    <div className={styles.revision_column_box_3}>
                        {
                            state.stop?.genActive && 
                            <div className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>Geração:</span>
                                <span>{state.stop?.genValue}</span>
                            </div>
                        }
                        {
                            state.stop?.diffActive && 
                            <div className={styles.revision_line_box}>
                                <span className={styles.title_line_3}>Diferença:</span>
                                <span>{state.stop?.diffValue}</span>
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
        try {
            if(direction === 'prev'){
                dispatch({type: 'changeStep', payload: {value: step - 1}})
                return;
            }
            
            const urlProblem = uuidv4();
            let agroupProblem = {...state.data, default: {active: state.default?.active, data: {...state.default, stop: state.stop}, limits: state.limits}}
            const dataModify = cloneDeep(agroupProblem);
            delete dataModify.default.data.active;
            console.log(dataModify);
            addNewRoute({
                name: dataModify?.title,
                href: `/problems/${urlProblem}`,
                dimension: dataModify?.dimension,
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
                        <span>{state.data?.title}</span>
                    </div>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_1}>Dimensão:</span>
                        <span>{state.data?.dimension}</span>
                    </div>
                    { state.default?.active && defaultValuesPrint() }
                </div>
                <div className={styles.revision_column_box_1}>
                    <div className={styles.revision_line_box}>
                        <span className={styles.title_line_1}>Função Objetivo:</span>
                        <span>{state.sketch?.objective}</span>
                    </div>
                    { state.restrictions?.active && restrictionsPrint() }
                </div>
            </div>
            <StepperControls step={step} onChangeStep={controlStepper} finish={true} />
        </>
    )
}