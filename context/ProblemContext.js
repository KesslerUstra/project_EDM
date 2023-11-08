import { createContext, useReducer } from "react";
import { cloneDeep } from "lodash";

export const ProblemContext = createContext({});

function reducerProblem(state, action){
    switch (action.type) {
        case 'changeStep':
            return {...state, stepActive: action.payload.value};
        case 'toggleActive':
            return {...state, [action.payload.type]: {...state?.[action.payload.type], active: action.payload.value}};
        case 'toggleState':
            return {...state, [action.payload.type]: {...state?.[action.payload.type], [action.payload.field]: !state[action.payload.type]?.[action.payload.field]}};
        case 'changeData':
            return {...state, [action.payload.type]: {...state?.[action.payload.type], [action.payload.field]: action.payload.value}};
        case 'changeLimits':
            return {...state, limits: {...state.limits, [action.payload.idx]: {...state.limits[action.payload.idx], [action.payload.field]: action.payload.value}}}
        case 'importAll':
            let data = cloneDeep(action.payload.data);
            delete data.default?.data?.stop;
            delete data.default?.limits;
            let defaultValues = cloneDeep({active: data.default?.active, ...data.default?.data});
            delete data.default;
            return {...state, data: data, default: defaultValues, stop: action.payload.data?.default?.data?.stop, limits: action.payload.data?.default?.limits}
        case 'deleteAll':
            return {data: {}, default: {active: true}, stop: {}, sketch: {}, limits: {}, restricions: {},stepActive: state.stepActive}
        default:
            return state;
    }
}

export function ProblemProvider({children}){

    const [state, dispatch] = useReducer(reducerProblem, {
        data: {},
        default: {active: true},
        stop: {},
        sketch: {},
        limits: {},
        restricions: {},
        stepActive: 0
    })
    return(
        <ProblemContext.Provider value={{state, dispatch}}>
            {children}
        </ProblemContext.Provider>
    )
}