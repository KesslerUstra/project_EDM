const VerificationsArray ={
    step_options: [{name: 'title', min: 5, max: 200, type: 'string'}, {name: 'dimension'}, {name: 'default', values: [{name: 'generations'}, {name: 'groups'}, {name: 'points', min: 4}, {name: 'stop'}, {name: 'limits'}]}],
    verifications_run: [{name: 'dimension'}, {name: 'generations'}, {name: 'groups'}, {name: 'points', min: 4}, {name: 'stop'}, {name: 'limits'}, {name: 'advanced', values: [{name: 'crossover_probability', min: 0, max: 1}, {name: 'disturbance_rate', min: 0, max: 2}]}]
}

export function verifyArrays(typeArray, data){
    const returnVerification = {};
    let arrayVerification = typeArray;
    if(typeof typeArray === 'string'){
        arrayVerification = VerificationsArray[typeArray];
    }

    arrayVerification.map(e => {
        switch (e.name) {
            case 'stop':
                stopVerification(data[e.name], returnVerification);
                break;
            case 'limits':
                limitsVerification(data[e.name], data.dimension, returnVerification);
                break;
            case 'advanced':
                advancedVerification(data[e.name], e.values, returnVerification);
                break;
            case 'default':
                defaultValuesVerification(data[e.name], e.values, data.dimension, returnVerification)
                break;
            default:
                if (defaultVerification(data[e.name], e.min ? e.min : 1, e.max ? e.max : undefined, e.type)) returnVerification[e.name] = true;
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

function defaultValuesVerification(defaultValues, fields, dimension = 0, returnVerification){
    console.log(defaultValues, fields, returnVerification)
    if(!defaultValues.active) return;
    returnVerification.default = {};

    fields.map(e => {
        switch (e.name) {
            case 'stop':
                stopVerification(defaultValues[e.name], returnVerification.default);
                break;
            case 'limits':
                limitsVerification(defaultValues[e.name], dimension, returnVerification.default);
                break;
            default:
                if (defaultVerification(defaultValues[e.name], e.min ? e.min : 1, e.max ? e.max : undefined, e.type)) returnVerification.default[e.name] = true;
                break;
        }
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
        if(isNaN(parseInt(limitsValue?.[e]?.inferior_limit)) || isNaN(parseInt(limitsValue?.[e]?.upper_limit))) returnVerification.limits[e] = true;
    })
    console.log(returnVerification)
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