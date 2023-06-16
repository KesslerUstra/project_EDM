"use client"

import React, { useState } from 'react'

import Input from '@/components/Input'
import { createPopulation, orderSliceArray } from './functions'
import styles from './page.module.css'


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
    setLimits(prev => ({...prev, [idx]: { ...prev[idx], [type]: parseInt(value) ? parseInt(value) : null}}));
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