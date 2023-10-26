import {orderSliceArray, createPopulation} from './population';
import { sampleSize, cloneDeep } from 'lodash';
import { executeFunctionAlgorithm } from './resultFunction';

export async function runningAlgorithm(nameProblem, data, limits, advanced = {}, restrictions = {}, endFn, loadingFn, maxTimePerChunk) {
  maxTimePerChunk = maxTimePerChunk || 200;
  let results = [];
  let variablesController = {gen: 1, repeat: 5, lastBest: null}
  let best;
  let newPop = createPopulation(nameProblem, data, limits, restrictions);
  newPop = orderSliceArray(false, newPop, data.points);

  function now() {
      return new Date().getTime();
  }

  async function doChunk() {
    let startTime = now();
    let bolStop = true;
    do {
      newPop = await AlgorithmEDM(nameProblem, newPop, data, limits, advanced, restrictions);
      best = betterPoint(newPop)[0];
      results.push(best);
      bolStop = stopMethod(data.stop, variablesController, best);
    } while ( bolStop && (now() - startTime) <= maxTimePerChunk);
    if (bolStop) {
      loadingFn(calculateLoading(data.stop, variablesController, best));
      setTimeout(doChunk, 10);
    }else{
      endFn(results);
    }
  }
  doChunk();
}

function calculateLoading(stopVariable, variables, best){

  if(stopVariable.genActive && stopVariable.diffActive){
    return Math.max((5 - variables.repeat)*20, parseInt((variables.gen / stopVariable.genValue) * 100));
  }

  if(stopVariable.genActive){
    return parseInt((variables.gen / stopVariable.genValue) * 100);
  }

  if(stopVariable.diffActive){
    return(5 - variables.repeat)*20;
  }
}

function stopMethod(stopVariable, variables, best){
  let controller = 0;

  if(stopVariable.genActive){
    if(variables.gen >= stopVariable.genValue){
      controller = 1;
    }
  }

  if(stopVariable.diffActive){
    if(variables.lastBest !== null){
      if(best.result === variables.lastBest.result){
        if(variables.repeat > 0){
          variables.repeat --;
        }else{
          controller = 1;
        }
      }
      else if(Math.abs(best.result - variables.lastBest.result) < stopVariable.diffValue){
        controller = 1;
      }
    }
  }

  variables.gen ++;
  variables.lastBest = best;
  if(controller >= 1){
    return false;
  }else{
    return true;
  }
}

async function AlgorithmEDM(nameProblem, pop, data, limits, advanced, restrictions){

    //Variaveis

    let disturbanceRate = advanced?.disturbance_rate ? advanced?.disturbance_rate : 1.4;
    let crossoverProbability = advanced?.crossover_probability ? advanced?.crossover_probability : 0.6;
    let crossoverType = advanced?.crossove_exp ? 'exponencial' : 'binomial';

    let k = 0, g = 0, i = 1;
    let popChanges = cloneDeep(pop);

    for (k = 0; k < pop.length; k++) {
      for ( g = 0; g < data.generations; g++) {
        let subPop = cloneDeep(popChanges[k]);
        for (i = 0; i < pop[k].length; i++) {

          //MUTAÇÃO

          let setChosen = cloneDeep(subPop[i]);
          let arrayInicial = cloneDeep(subPop);
          arrayInicial.splice(i, 1);

          let teste = sampleSize(arrayInicial, 3);
          let teste2 = await actionVector(teste[0], await actionVector( await actionVector(teste[1], teste[2], 'subtracao'), [], 'multiplicacaoValor', disturbanceRate));

          //CRUZAMENTO

          let teste3 = await crossingVector(crossoverProbability, crossoverType, teste2, setChosen);

          //Verificando viabilidade do vetor U

          for(const property in teste3){
            if( teste3[property] < limits[property].inferior_limit){
              teste3[property] = limits[property].inferior_limit;
            }else if(teste3[property] > limits[property].upper_limit){
              teste3[property] = limits[property].upper_limit;
            }
          }

          //SELEÇÃO

          teste3.result = executeFunctionAlgorithm(nameProblem, teste3, restrictions);
          if(setChosen.result === undefined){
            setChosen.result = executeFunctionAlgorithm(nameProblem, setChosen, restrictions);
          }

          if(teste3.result < setChosen.result){
            popChanges[k][i] = teste3;
          }else{
            popChanges[k][i] = setChosen;
          }
        }
      }
    }
    return popChanges;
}

async function actionVector(arry1, arry2, type, value = 1){
    let arryFinal = {};
    for(const property in arry1){
      if(property !== 'result'){
        switch (type) {
          case 'soma':
            arryFinal[property] = parseFloat((arry1[property] + arry2[property]).toFixed(4));
          break;
          case 'subtracao':
            arryFinal[property] = parseFloat((arry1[property] - arry2[property]).toFixed(4));
          break;
          case 'multiplicacaoValor':
            arryFinal[property] = parseFloat((arry1[property] * value).toFixed(4));
          break;
          default:
            arryFinal[property] = parseFloat((arry1[property] + arry2[property]).toFixed(4));
          break;
        }
      }
    }
    return arryFinal;
}

export function betterPoint(pop){
    let arry = pop.flat().sort((a, b) => a.result - b.result);
    return arry;
}

async function crossingVector(cr, type, arryV, arryX){
  let typeExponential = false;
  let arryFinal = {};
  for(const property in arryV){
    if(property === 'result'){
      return;
    }
    if(type === 'binomial'){
      if(Math.random() > cr){
        arryFinal[property] = arryX[property];
      }else{
        arryFinal[property] = arryV[property];
      }
    }else{
      if(Math.random() > cr) typeExponential = true;
      if(typeExponential){
        arryFinal[property] = arryX[property];
      }else{
        arryFinal[property] = arryV[property];
      }
    }
  }
  return arryFinal;
}