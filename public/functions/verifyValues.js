const VerificationsStepper ={
    step_one: [{name: 'title', min: 5, max: 200, type: 'string'}, {name: 'dimension'}, {name: 'default', values: [{name: 'generations'}, {name: 'groups'}, {name: 'points', min: 4}, {name: 'stop'}, {name: 'limits'}]}],
    step_two: []
}

export function verifyValuesProblemCreate(step, data){
    const returnVerification = {};
    const defaultVerifications = VerificationsStepper[step];

    defaultVerifications.map(e => {
        switch (e.name) {
            case 'dimension':
                if (defaultVerification(data?.data?.[e.name]?.value)) returnVerification[e.name] = true;
                break;
            case 'default':
                defaultValuesVerification(data[e.name], e.values, returnVerification);
                break;
            default:
                if (defaultVerification(data[e.name], e.min ? e.min : 1, e.max ? e.max : undefined, e?.type)) returnVerification[e.name] = true;
                break;
        }
    })

    return returnVerification;
}


export function verifyValuesConfiguration(data, limits, advanced){
    const returnVerification = {};
    const defaultVerifications = [{name: 'dimension'}, {name: 'generations'}, {name: 'groups'}, {name: 'points', min: 4}, {name: 'stop'}, {name: 'limits'}, {name: 'advanced', values: [{name: 'crossover_probability', min: 0, max: 1}, {name: 'disturbance_rate', min: 0, max: 2}]}];

    defaultVerifications.map(e => {
        switch (e.name) {
            case 'dimension':
                if (defaultVerification(data[e.name].value)) returnVerification[e.name] = true;
                break;
            case 'stop':
                stopVerification(data[e.name], returnVerification);
                break;
            case 'limits':
                limitsVerification(limits, data.dimension?.value, returnVerification);
                break;
            case 'advanced':
                advancedVerification(advanced, e.values, returnVerification);
                break;
            default:
                if (defaultVerification(data[e.name], e.min ? e.min : 1, e.max ? e.max : undefined)) returnVerification[e.name] = true;
                break;
        }
    })

    return returnVerification;
}

function defaultVerification(value, min = 1, max, type = 'number'){
    if(type === 'number'){
        if(isNaN(value)) return true;
        if(min !== undefined && value < min) return true;
        if(max !== undefined && value > max) return true;
        return false;
    }

    if(!value) return true;
    if(min !== undefined && value.length < min) return true;
    if(max !== undefined && value.length > max) return true;
    return false;
}

function defaultValuesVerification(defaultValues, values, returnVerification){
    if(!defaultValues.active) return;
    returnVerification.default = {};
    values.map((e) =>{
        if(e.name === 'stop'){
            stopVerification(defaultValues?.data?.stop, returnVerification);
            return;
        }else if(e.name === 'limits'){
            limitsVerification(defaultValues?.limits, defaultValues?.data?.dimension?.value, returnVerification);
            return;
        }
        if(defaultVerification(defaultValues?.data?.[e.name], e.min, e.max)) returnVerification.default[e.name]= true;
    })
    if(Object.keys(returnVerification.default).length === 0) delete returnVerification.default;
}

function advancedVerification(advancedValue, values, returnVerification){
    if(!advancedValue.active) return;
    returnVerification.advanced = {};
    values.map((e) =>{
        if(advancedValue?.[e.name] !== undefined && advancedValue?.[e.name] !== ""){
            if(defaultVerification(advancedValue?.[e.name], e.min, e.max)) returnVerification.advanced[e.name]= true;
        }
    })
    if(Object.keys(returnVerification.advanced).length === 0) delete returnVerification.advanced;
}

function limitsVerification(limitsValue, dimension, returnVerification){
    returnVerification.limits = {};
    if(!dimension){
        return;
    }
    [...Array(dimension).keys()].map(e =>  {
        if(isNaN(limitsValue?.[e]?.inferior_limit) || isNaN(limitsValue?.[e]?.upper_limit)) returnVerification.limits[e] = true;
    })
    if(Object.keys(returnVerification.limits).length === 0) delete returnVerification.limits;
}


function stopVerification(stopValue, returnVerification){
    returnVerification.stop = {};
    if(stopValue?.genActive && (stopValue?.genValue === "" || stopValue?.genValue === undefined)){
        returnVerification.stop.gen = true;
        return;
    }
    if(stopValue?.diffActive && (stopValue?.diffValue === "" || stopValue?.diffValue === undefined)){
        returnVerification.stop.diff = true;
        return;
    }
    if(!stopValue?.genActive && !stopValue?.diffActive){
        returnVerification.stop.gen = true;
        returnVerification.stop.diff = true;
    }
    if(Object.keys(returnVerification.stop).length === 0) delete returnVerification.stop;
    return;
}