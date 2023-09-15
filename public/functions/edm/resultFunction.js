export const functions = {
    springs: (data) => (0.5*8*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10-data[1], 2) ) - 10, 2) + 0.5*1*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10+data[1], 2) ) - 10, 2) - 5*data[0] - 5*data[1]),
    pendulum: (data) => 500*(2.5*(1-Math.cos(data[0]))) - 100*(2.5*(Math.sin(data[0]))),
    flagpole: (data) => (Math.PI*(Math.pow(data[0],2) - Math.pow(data[1], 2)))/4,
    steeltransport: (data) => (2000*data[0] + 1700*data[1] + 1600*data[2] + 1100*data[3] + 400*data[4] + 800*data[5]),
    farmer: (data) => (-300*data[0] - 400*data[1] - 500*data[2])
};

export function executeFunctionAlgorithm(functionName, data, restrictions = {}) {
    const func = functions[functionName];
    if (typeof func === 'function') {
      if(restrictions?.active){
        let p = 0;
        restrictions.functions.map((e) => {
          p += Math.pow(Math.max(0, e.function({data: data, variables: restrictions.variables})),2);
        });
        return (func(data) + 1000*p);
      }
      return func(data);
    }
}