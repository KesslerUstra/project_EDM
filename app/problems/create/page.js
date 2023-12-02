import styles from './page.module.css';

import BackButton from '@/components/Buttons/BackButton';
import { StepperCreate } from '@/components/StepperConstructor';
import { ProblemProvider } from "@/context/ProblemContext";


export default function CreateProblems() {

    return (
        <div className={styles.page_create_box}>
            <BackButton />
            <h2 className={styles.title_page}>Criar Problema</h2>
            <ProblemProvider>
                <StepperCreate />
            </ProblemProvider>
        </div>
    )
}