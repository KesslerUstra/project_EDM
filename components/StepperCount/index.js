import styles from './StepperCount.module.css';
import React from 'react';

export default function StepperCount({steps = 0, stepActive = 0}){
    return(
        <div className={styles.stepper_count_box}>
            {[...Array(steps).keys()].map(e => (
                <React.Fragment key={e}>
                    {e > 0 && e < steps &&
                        <div className={e > stepActive ? '' : styles.active}></div>
                    }
                    <span className={e > stepActive ? '' : styles.active}>{e+1}</span>
                    
                </React.Fragment>
            ))}
        </div>
    )
}