"use client"

import React, { useState } from 'react'
import Input from '@/components/Input'
import { createPopulation, orderSliceArray, resultFunction } from './functions'
import styles from './page.module.css'
import { sampleSize, cloneDeep } from 'lodash'

export default function Home() {

  const [data, setData] = useState({});
  const [limits, setLimits] = useState({});
  const [population, setPopulation] = useState([]);

  console.log(data);
  console.log(limits);

  function changeData(type, value){
    setData(prev => ({...prev, [type]: parseInt(value) ? parseInt(value) : 0}));
  }

  function changeDataLimits(type, idx, value){
    setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseInt(value) !== NaN ? parseInt(value) : null}}));
  }

  function renderItems(){
    const items = [];
    
    for (let i = 0; i < data.dimension; i++) {
      items.push(
        <React.Fragment key={i}>
          <Input label={`Limite Inferior ${i+1}`} onChange={(e) => changeDataLimits('inferior_limit', i, e.target.value)} type={'number'}/>
          <Input label={`Limite Superior ${i+1}`} onChange={(e) => changeDataLimits('upper_limit', i, e.target.value)} type={'number'}/>
        </React.Fragment>
      );
    }
    return items;
  };

  function runningAlghoritm(){
    let newPop = createPopulation(data, limits);
    console.log('population', newPop);
    newPop = orderSliceArray(false, newPop, data.points);
    setPopulation(newPop);
    console.log('pop', newPop);
    console.log('pop',betterPoint(newPop));
    newPop = AlghoritmED(newPop);
    console.log('pop', newPop);
    console.log('pop',betterPoint(newPop));
  }

  function AlghoritmED(pop){
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

  function betterPoint(pop){
    let arry = pop.flat().sort((a, b) => a.result - b.result);
    return arry;
  }


  return (
    <>
      <div style={{padding: '20px'}}>
        <h2 style={{marginBottom: '30px'}}>Projeto Evolução Diferencial Melhorada (EDM)</h2>
        <Input label={'Dimensão(n)'} onChange={(e) => changeData('dimension', e.target.value)} type={'number'}/>
        <div style={{padding: '10px 0px 30px'}}>
          { data?.dimension > 0 && renderItems()}
        </div>
        <Input label={'Número Conjuntos(p)'} onChange={(e) => changeData('groups', e.target.value)} type={'number'}/>
        <Input label={'Número de pontos em cada conjunto(m)'} onChange={(e) => changeData('points', e.target.value)} type={'number'}/>
        <Input label={'Número máximo de gerações(Gmax)'} onChange={(e) => changeData('generations', e.target.value)} type={'number'}/>
        <div style={{marginTop: '40px'}}>
          <button onClick={runningAlghoritm}>Calcular</button>
        </div>
      </div>
    </>
  )
}