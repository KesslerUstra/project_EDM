export function resultFunction(data){
    return (0.5*8*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10-data[1], 2) ) - 10, 2) + 0.5*1*Math.pow( Math.sqrt( Math.pow(data[0], 2) + Math.pow( 10+data[1], 2) ) - 10, 2) - 5*data[0] - 5*data[1]);
}