export function createPopulation(data, limits){
    let population = [];
    for (let groupIdx = 0; groupIdx < data.groups; groupIdx++) {
      for (let pointsIdx = 0; pointsIdx < data.points; pointsIdx++) {
        let points = {};
        for (let componentIdx = 0; componentIdx < data.dimension; componentIdx++) {
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

export function resultFunction(data){
    return (0.5*8*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10-data[1], 2) ) - 10, 2) + 0.5*1*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10+data[1], 2) ) - 10, 2) - 5*data[0] - 5*data[1]);
}