'use client'

import React, { Suspense } from 'react';

// Função que retorna uma Promise simulada
const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = 'Dados carregados com sucesso!';
      resolve(data);
    }, 2000);
  });
};

// Função de utilitário para criar um recurso (resource)
function createResource(fetchData) {
  let data = null;
  let error = null;

  const suspender = fetchData().then(
    response => (data = response),
    err => (error = err)
  );

  return {
    read() {
      if (error) {
        throw error;
      }
      if (data === null) {
        throw suspender;
      }
      return data;
    }
  };
}

const resource = createResource(fetchData);

function SeuComponenteAssincrono() {
  const data = resource.read();

  return <div>Dados carregados: {data}</div>;
}

function TesteSuspense() {
  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        <SeuComponenteAssincrono />
      </Suspense>
    </div>
  );
}

export default TesteSuspense;
