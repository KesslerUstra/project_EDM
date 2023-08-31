export function verifyValuesConfiguration(data, limits){
    const returnVerification = {};
    const defaultVerifications = ['dimension', 'generations', 'groups', 'points', 'stop', 'limits'];

    defaultVerifications.map(e => {
        switch (e) {
            case 'dimension':
                console.log(data[e]?.value)
                if (isNaN(data[e]?.value)) returnVerification.dimension = true;
                break;
            case 'stop':
                stopVerification(data[e], returnVerification);
                break;
            case 'limits':
                limitsVerification(limits, data.dimension?.value, returnVerification);
                break;
            case 'points':
                if (defaultVerification(data[e], 4)) returnVerification[e] = true;
                break;
            default:
                if (defaultVerification(data[e], 1)) returnVerification[e] = true;
                break;
        }
    })

    return returnVerification;
}

function defaultVerification(value, min, max){
    if(isNaN(value)) return true;
    if(min !== undefined && value < min) return true;
    if(max !== undefined && value > max) return true;
    return false;
}

function limitsVerification(limitsValue, dimension, returnVerification){
    returnVerification.limits = {};
    if(!dimension){
        return;
    }
    [...Array(dimension).keys()].map(e =>  {
        if(isNaN(limitsValue[e]?.inferior_limit) || isNaN(limitsValue[e]?.upper_limit)) returnVerification.limits[e] = true;
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