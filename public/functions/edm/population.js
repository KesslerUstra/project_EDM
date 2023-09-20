import { executeFunctionAlgorithm } from './resultFunction';

export function createPopulation(nameProblem, data, limits, restrictions){
    let population = [];
    for (let groupIdx = 0; groupIdx < data.groups; groupIdx++) {
      for (let pointsIdx = 0; pointsIdx < data.points; pointsIdx++) {
        let points = {};
        for (let componentIdx = 0; componentIdx < data.dimension.value; componentIdx++) {
          let component = Math.floor(((Math.random() * (limits[componentIdx].upper_limit - limits[componentIdx].inferior_limit)) + limits[componentIdx].inferior_limit)*10000)/10000;
          points[componentIdx] = component;
        }
        points.result = executeFunctionAlgorithm(nameProblem, points, restrictions);
        population.push(points);
      }
    }
    return population;
}

export function orderSliceArray(order = false, population, subArray){
    let popNew = population;
    if(order){
        popNew = population.sort((a, b) => {
            if (a.result < b.result) {
                return -1;
            }
            if (a.result > b.result) {
                return 1;
            }
            return 0;
        });
    }

    const subArrays = [];
    let index = 0;

    while (index < population.length) {
        subArrays.push(popNew.slice(index, index + subArray));
        index += subArray;
    }

    return subArrays;
}