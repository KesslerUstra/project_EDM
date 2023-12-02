export function validateFunction(funcao, dimension){

    if (typeof funcao !== 'string') {
        return { error: 'A entrada não é uma função.' };
    }

    const variaveisEncontradas = funcao.match(/x(\d+)/g);
    if (!variaveisEncontradas) {
        return { error: 'A função não contém variáveis.' };
    }

    let count = 0;
    for (const char of funcao) {
        if (char === '(') {
            count++;
        } else if (char === ')') {
            count--;
            if (count < 0) {
                return { error: 'A função possui mais parênteses de fechamento do que de abertura' };
            }
        }
    }

    if(count !== 0){
        return { error: 'A função com número de parênteses de abertura e fechamento diferentes' };
    }

    const variaveisUnicas = [...new Set(variaveisEncontradas)];
    const variaveisNumericas = variaveisUnicas.map(variavel => Number(variavel.slice(1)));
    console.log(variaveisUnicas, variaveisNumericas)
    variaveisNumericas.sort((a, b) => a - b);
    console.log(variaveisNumericas)

    for (let i = 1; i <= dimension; i++) {
        console.log(variaveisNumericas.includes(i))
        if (!variaveisNumericas.includes(i)) {
            return { error: `x${i} não está presente na função.` };
        }
    }

    if(variaveisNumericas.length !== dimension){
        return { error: `A função contém variáveis além da dimensão escolhida.` };
    }

    // const funcaoSubstituida = variaveisUnicas.reduce((funcao, variavel) => {
    //     const indice = Number(variavel.slice(1)) - 1;
    //     return funcao.replace(new RegExp(variavel, 'g'), `data[${indice}]`);
    // }, funcao);

    return { success: true, functionFinal: funcao };
}