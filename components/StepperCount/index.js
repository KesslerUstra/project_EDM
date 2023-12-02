'use client'

import styles from './StepperCount.module.css';

import { animateScroll as scroll } from "react-scroll";
import { useEffect, Fragment, memo } from "react";

const options = {
    duration: 400,
    smooth: true,
};


function StepperCountComponent({steps = 0, stepActive = 0}){

    useEffect(() => {
        scroll.scrollToTop(options);
    }, [stepActive]);

    return(
        <div className={styles.stepper_count_box}>
            {[...Array(steps).keys()].map(e => (
                <Fragment key={e}>
                    {e > 0 && e < steps &&
                        <div className={e > stepActive ? '' : styles.active}></div>
                    }
                    <span className={e > stepActive ? '' : styles.active}>{e+1}</span>
                </Fragment>
            ))}
        </div>
    )
}

export const StepperCount = memo(StepperCountComponent);