import {orderSliceArray, createPopulation} from './population';
import { sampleSize, cloneDeep } from 'lodash';
import { resultFunction } from './resultFunction';

export async function runningAlghoritm(data, limits){

    let results = [];

    let newPop =  createPopulation(data, limits);
    console.log('population', newPop);
    newPop = orderSliceArray(false, newPop, data.points);
    console.log('pop', newPop);
    console.log('pop',betterPoint(newPop));
    console.log('pop',data);
    for (let stopp = 0; stopp < data.stop.genValue; stopp++) {
      newPop = await AlghoritmEDM(newPop, data, limits);
      results.push(betterPoint(newPop));
      console.log('pop',betterPoint(newPop));
    }
    return results;
}

async function AlghoritmEDM(pop, data, limits){
    let k = 0, g = 0, i = 1;
    let popChanges = cloneDeep(pop);
    for (k = 0; k < pop.length; k++) {
      for ( g = 0; g < data.generations; g++) {
        let subPop = cloneDeep(popChanges[k]);
        for (i = 0; i < pop[k].length; i++) {

          //MUTAÇÃO

          console.log(`teste / K = ${k} - G = ${g} - I = ${i}`);
          let setChosen = cloneDeep(subPop[i]);
          let arrayInicial = cloneDeep(subPop);
          arrayInicial.splice(i, 1);
          console.log(arrayInicial);
          console.log(setChosen);

          let teste = sampleSize(arrayInicial, 3);
          console.log(teste); 
          console.log(actionVector(teste[0], teste[1]));
          let teste2 = actionVector(teste[0], actionVector(actionVector(teste[1], teste[2], 'subtracao'), [], 'multiplicacaoValor', 1.4));
          console.log(teste2);

          //CRUZAMENTO

          let cr = 0.6;
          let teste3 = crossingVector(cr, teste2, setChosen);

          //Verificando viabilidade do vetor U

          for(const property in teste3){
            if( teste3[property] < limits[property].inferior_limit){
              teste3[property] = limits[property].inferior_limit;
            }else if(teste3[property] > limits[property].upper_limit){
              teste3[property] = limits[property].upper_limit;
            }
          }

          //SELEÇÃO

          teste3.result = resultFunction(teste3);
          if(setChosen.result === undefined){
            setChosen.result = resultFunction(setChosen);
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

function actionVector(arry1, arry2, type, value = 1){
    console.log(arry1);
    console.log(arry2);
    console.log(type);
    console.log(value);
    let arryFinal = {};
    for(const property in arry1){
      if(property !== 'result'){
        switch (type) {
          case 'soma':
            console.log('soma');
            arryFinal[property] = parseFloat((arry1[property] + arry2[property]).toFixed(2));
          break;
          case 'subtracao':
            console.log('subtracao');
            arryFinal[property] = parseFloat((arry1[property] - arry2[property]).toFixed(2));
          break;
          case 'multiplicacaoValor':
            console.log('multiplicacaoValor');
            arryFinal[property] = parseFloat((arry1[property] * value).toFixed(2));
          break;
          default:
            console.log('error');
            arryFinal[property] = parseFloat((arry1[property] + arry2[property]).toFixed(2));
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

function crossingVector(cr, arryV, arryX){
  let arryFinal = {};
  for(const property in arryV){
    if(property === 'result'){
      return;
    }
    if(Math.random() > cr){
      console.log('Entrou no Cruzamento', property);
      arryFinal[property] = arryX[property];
    }else{
      console.log('Não Entrou no Cruzamento', property);
      arryFinal[property] = arryV[property];
    }
  }
  return arryFinal;
}