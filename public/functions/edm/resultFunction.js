export const functions = {
    springs: (data) => (0.5*8*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10-data[1], 2) ) - 10, 2) + 0.5*1*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10+data[1], 2) ) - 10, 2) - 5*data[0] - 5*data[1]),
    pendulum: (data) => 500*(2.5*(1-Math.cos(data[0]))) - 100*(2.5*(Math.sin(data[0])))
};
  
export function executeFunctionAlgorithm(functionName, data) {
    const func = functions[functionName];
    if (typeof func === 'function') {
      return func(data);
    }
}