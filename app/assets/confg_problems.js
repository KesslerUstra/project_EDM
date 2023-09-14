export const problems = {
    "springs":{
        "title": "Problema das Molas",
        "data": {
            "dimension": {"value": 2, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 2, "disabled": true},
                "generations": 4,
                "groups": 3,
                "points": 5,
                "stop": {
                    "genActive": true,
                    "genValue": 4
                }
            },
            "limits":{
                "0": {
                    "inferior_limit": 0,
                    "upper_limit": 10
                },
                "1": {
                    "inferior_limit": 0,
                    "upper_limit": 10
                }
            }
        }
    },
    "pendulum":{
        "title": "Problema do Pêndulo",
        "data": {
            "dimension": {"value": 1, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 1, "disabled": true},
                "generations": 4,
                "groups": 3,
                "points": 5,
                "stop": {
                    "genActive": true,
                    "genValue": 4
                }
            },
            "limits":{
                "0": {
                    "inferior_limit": 0,
                    "upper_limit": Math.PI/2
                }
            }
        }
    },
    "flagpole":{
        "title": "Projeto de um Mastro de Bandeira",
        "data": {
            "dimension": {"value": 2, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 2, "disabled": true},
                "generations": 4,
                "groups": 3,
                "points": 5,
                "stop": {
                    "genActive": true,
                    "genValue": 4
                }
            },
            "limits":{
                "0": {
                    "inferior_limit": 0.05,
                    "upper_limit": 0.50
                },
                "1": {
                    "inferior_limit": 0.04,
                    "upper_limit": 0.45
                }
            }
        },
        "restrictions":{
            active: true,
            variables : {
                S: (4000 + 2000*5),
                M: (4000*5 + 0.5*2000*Math.pow(5,2)),
                I: function(data){return(Math.PI/64)*(Math.pow(data[0],4) - Math.pow(data[1],4))},
            },
            functions:[
                {function: function({data,variables}){return(4000*125)/(3*210e9*variables.I(data)) + (2000*Math.pow(5,4))/(8*210e9*variables.I(data))-0.1}},
                {function: function({data}){return(data[0] + data[1])/(data[0] - data[1]) - 60}},
                {function: function({data}){return(-data[0]+data[1]+0.016)}},
                {function: function({data}){return(data[0]-data[1]-0.04)}},
                {function: function({data, variables}){return(variables.M*data[0]/(2*variables.I(data))- 165e6)}},
                {function: function({data, variables}){return(variables.S*(Math.pow(data[0],2)+data[0]*data[1]+Math.pow(data[1],2))/(12*variables.I(data)) - 50e6)}},
            ]
        }
    }
}