'use client'

import { StepperCount } from "../StepperCount";
import useProblemContext from '@/hooks/useProblemContext';
import StepOptions from "./StepOptions";
import StepFunction from "./StepFunction";
import StepRevision from "./StepRevision";
import StepUploadFile from "./StepUploadFile";


export function StepperCreate(){
    const {stepActive} = useProblemContext().state;
    
    return(
        <>
            <StepperCount steps={3} stepActive={stepActive} />
            {
                (() => {
                switch (stepActive) {
                    case 0:
                        return (
                            <StepOptions step={0} />
                        )
                    case 1:
                        return (
                            <StepFunction step={1} />
                        )
                    case 2:
                        return (
                            <StepRevision step={2} />
                        )
                }
            })()
            }
        </>
    );
}

export function StepperImport(){
    const {stepActive} = useProblemContext().state;
    
    return(
        <>
            <StepperCount steps={2} stepActive={stepActive} />
            {
                (() => {
                switch (stepActive) {
                    case 0:
                        return (
                            <StepUploadFile step={0} />
                        )
                    case 1:
                        return (
                            <StepRevision step={1} />
                        )
                }
            })()
            }
        </>
    );
}