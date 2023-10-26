import styles from './StepperControls.module.css';
import { animateScroll } from 'react-scroll';

import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function StepperControls({step, onChangeStep, finish= false}){

    function nextStep(){
        onChangeStep('next');
        // animateScroll.scrollToTop({
        //     duration: 400,
        //     smooth: 'easeInOutQuart',
        // })
    }

    function prevStep(){
        onChangeStep('prev');
        // animateScroll.scrollToTop({
        //     duration: 400,
        //     smooth: 'easeInOutQuart',
        // })
    }

    function finishStep(){
        onChangeStep('finish');
    }

    return(
        <div style={{display: 'flex', gap: '4px', padding: '80px 10px 40px'}}>
            {step > 0 &&
                <div className={styles.stepper_controls_box} style={{justifyContent: 'flex-end'}}>
                    <button onClick={prevStep} className={styles.button} style={{backgroundColor: 'var(--color-text-3)', '--back-shadow': '#24242433', '--direction': '-2px'}}><MdKeyboardDoubleArrowLeft />Voltar</button>
                </div>
            }
            <div className={styles.stepper_controls_box} style={{justifyContent: step < 1 ? 'center' : ''}}>
                {finish ?
                    <button onClick={finishStep} className={styles.button} style={{backgroundColor: 'var(--color-blue-2)', '--back-shadow': '#3278e033', '--direction': '2px'}}>Finalizar<MdKeyboardDoubleArrowRight /></button>
                :
                    <button onClick={nextStep} className={styles.button} style={{backgroundColor: 'var(--color-blue-2)', '--back-shadow': '#3278e033', '--direction': '2px'}}>Avançar<MdKeyboardDoubleArrowRight /></button>
                }
                
            </div>
        </div>
    )
}