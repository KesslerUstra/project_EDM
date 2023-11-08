import { ProblemContext } from "@/context/ProblemContext";
import { useContext } from "react";

export default function useProblemContext(){
    const context = useContext(ProblemContext);

    if(context === undefined){
        throw new Error('Não está dentro do contexto');
    }

    return context;
}