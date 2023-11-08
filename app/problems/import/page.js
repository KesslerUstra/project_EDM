'use client'

import styles from './page.module.css';

import BackButton from '@/components/Buttons/BackButton';
import { StepperImport } from '@/components/StepperConstructor';
import { ProblemProvider } from "@/context/ProblemContext";

export default function ImportProblems() {

    return (
        <div className={styles.page_create_box}>
            <BackButton />
            <h2 className={styles.title_page}>Importar Problema</h2>
            <ProblemProvider>
                <StepperImport />
            </ProblemProvider>
        </div>
    )
}