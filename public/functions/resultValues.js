export function calcularDesvioPadrao(arr = []) {
    if(arr.length <= 0) return {};
    const media = arr.reduce((acc, valor) => acc + valor.result, 0) / arr.length;
  
    const somaDosQuadradosDasDiferencas = arr.reduce((acc, valor) => {
      const diferenca = valor.result - media;
      return acc + diferenca * diferenca;
    }, 0);

    console.log(somaDosQuadradosDasDiferencas);
  
    const desvioPadrao = Math.sqrt(somaDosQuadradosDasDiferencas / arr.length);
  
    return {m:  media.toFixed(4), dp: desvioPadrao.toFixed(4)};
  }