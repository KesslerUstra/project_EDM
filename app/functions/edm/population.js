import { resultFunction } from './resultFunction';

export function createPopulation(data, limits){
    let population = [];
    for (let groupIdx = 0; groupIdx < data.groups; groupIdx++) {
      for (let pointsIdx = 0; pointsIdx < data.points; pointsIdx++) {
        let points = {};
        for (let componentIdx = 0; componentIdx < data.dimension.value; componentIdx++) {
          let component = Math.floor(((Math.random() * (limits[componentIdx].upper_limit - limits[componentIdx].inferior_limit)) + limits[componentIdx].inferior_limit)*100)/100;
          points[componentIdx] = component;
        }
        points.result = resultFunction(points);
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
        console.log('population', popNew);
    }

    const subArrays = [];
    let index = 0;

    while (index < population.length) {
        subArrays.push(popNew.slice(index, index + subArray));
        index += subArray;
    }

    console.log('population', subArrays);
    return subArrays;
}