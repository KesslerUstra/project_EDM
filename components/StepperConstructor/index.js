import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepperControls from "../StepperControls";

export default function StepperConstructor({step, setStep, data, setData, sketch, setSketch, finishFunction}){
    return(
        <>
        {
            (() => {
            switch (step) {
                case 0:
                    return (
                        <StepOne data={data} setData={setData} setStep={setStep} />
                    )
                case 1:
                    return (
                        <StepTwo data={data} setData={setData} sketch={sketch} setSketch={setSketch} setStep={setStep} />
                    )
                case 2:
                    return (
                        <>
                            <StepThree data={data} setData={setData} sketch={sketch} setStep={setStep} />
                        </>
                    )
            }
          })()
        }
        </>
    );
}