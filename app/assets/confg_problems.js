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
                {function: function({data,variables}){return((4000*125)/(3*210e9*variables.I(data)) + (2000*Math.pow(5,4))/(8*210e9*variables.I(data))-0.1)}},
                {function: function({data}){return(data[0] + data[1])/(data[0] - data[1]) - 60}},
                {function: function({data}){return(-data[0]+data[1]+0.016)}},
                {function: function({data}){return(data[0]-data[1]-0.04)}},
                {function: function({data, variables}){return(variables.M*data[0]/(2*variables.I(data))- 165e6)}},
                {function: function({data, variables}){return(variables.S*(Math.pow(data[0],2)+data[0]*data[1]+Math.pow(data[1],2))/(12*variables.I(data)) - 50e6)}},
            ]
        }
    },
    "steeltransport":{
        "title": "Problema Transporte de Aço",
        "data": {
            "dimension": {"value": 6, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 6, "disabled": true},
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
                    "upper_limit": 30
                },
                "1": {
                    "inferior_limit": 0,
                    "upper_limit": 30
                },
                "2": {
                    "inferior_limit": 0,
                    "upper_limit": 50
                },
                "3": {
                    "inferior_limit": 0,
                    "upper_limit": 50
                },
                "4": {
                    "inferior_limit": 0,
                    "upper_limit": 70
                },
                "5": {
                    "inferior_limit": 0,
                    "upper_limit": 70
                }
            }
        },
        "restrictions":{
            active: true,
            variables : {},
            functions:[
                {function: function({data}){return(data[0] + data[1] - 40)}},
                {function: function({data}){return(-data[0] - data[1] + 40)}},
                {function: function({data}){return(data[2] + data[3] - 60)}},
                {function: function({data}){return(-data[2] - data[3] + 60)}},
                {function: function({data}){return(data[0] - 30)}},
                {function: function({data}){return(data[1] - 30)}},
                {function: function({data}){return(data[2] - 50)}},
                {function: function({data}){return(data[3] - 50)}},
                {function: function({data}){return(data[4] - 70)}},
                {function: function({data}){return(data[5] - 70)}},
                {function: function({data}){return(data[0] + data[2] - data[4])}},
                {function: function({data}){return(-data[0] - data[2] + data[4])}},
                {function: function({data}){return(data[1] + data[3] - data[5])}},
                {function: function({data}){return(-data[1] - data[3] + data[5])}},
                {function: function({data}){return(data[4] + data[5] - 100)}},
                {function: function({data}){return(-data[4] - data[5] + 100)}},
            ]
        }
    },
    "farmer":{
        "title": "Problema do Fazendeiro",
        "data": {
            "dimension": {"value": 3, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 3, "disabled": true},
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
                    "upper_limit": 100
                },
                "1": {
                    "inferior_limit": 0,
                    "upper_limit": 100
                },
                "2": {
                    "inferior_limit": 0,
                    "upper_limit": 100
                }
            }
        },
        "restrictions":{
            active: true,
            variables : {},
            functions:[
                {function: function({data}){return(100*data[1] + 200*data[2] - 14000)}},
                {function: function({data}){return(100000*data[1] + 200000*data[2] - 12750000)}},
                {function: function({data}){return(data[0] + data[1] + data[2] - 100)}},
            ]
        }
    },
    "pressure":{
        "title": "Problema Recipiente de Pressão",
        "data": {
            "dimension": {"value": 4, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 4, "disabled": true},
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
                },
                "2": {
                    "inferior_limit": 10,
                    "upper_limit": 100
                },
                "3": {
                    "inferior_limit": 100,
                    "upper_limit": 200
                }
            }
        },
        "restrictions":{
            active: true,
            variables : {},
            rp: 100000,
            functions:[
                {function: function({data}){return(-data[0] + 0.0193*data[2])}},
                {function: function({data}){return(-data[1] + 0.00954*data[2])}},
                {function: function({data}){return(-Math.PI*(Math.pow(data[2],2))*data[3] - 4/3*Math.PI*(Math.pow(data[2],3)) + 1296000)}},
                {function: function({data}){return(data[3] - 240)}},
            ]
        }
    },
    "beam":{
        "title": "Problema Viga Engastada",
        "data": {
            "dimension": {"value": 4, "disabled": true}
        },
        "default": {
            "data": {
                "dimension": {"value": 4, "disabled": true},
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
                    "inferior_limit": 0.1,
                    "upper_limit": 2
                },
                "1": {
                    "inferior_limit": 0.1,
                    "upper_limit": 4
                },
                "2": {
                    "inferior_limit": 0.1,
                    "upper_limit": 10
                },
                "3": {
                    "inferior_limit": 0.1,
                    "upper_limit": 10
                }
            }
        },
        "restrictions":{
            active: true,
            variables : {
                P: 6000,
                L: 14,
                E: Math.pow(300,6),
                G: Math.pow(120,6),
                tm: 13600,
                sm: 30000,
                gm: 0.25,
                t1: function(data){return(this.P/(Math.sqrt(2)*data[0]*data[1]))},
                M: function(data){return(this.P*(this.L+(data[1]/2)))},
                R: function(data){return(Math.sqrt(Math.pow(data[1],2)/4 + Math.pow(((data[0] + data[2])/2),2)))},
                J: function(data){return(2*Math.sqrt(2)*data[0]*data[1]*(Math.pow(data[1],2)/12 + Math.pow((data[0] + data[2])/2, 2)))},
                t2: function(data){return(this.M(data)*this.R(data)/this.J(data))},
                si: function(data){return(6*this.P*this.L/(data[3]*Math.pow(data[2],2)))},
                ga: function(data){return((4*this.P*Math.pow(this.L,3))/(this.E*Math.pow(data[2], 3)*data[3]))},
                Pc: function(data){return(((4.013*this.E*Math.sqrt(Math.pow(data[2],2)*Math.pow(data[3],6)/36))/Math.pow(this.L,2))*(1-(data[2]/(2*this.L))*Math.sqrt(this.E/(4*this.G))))},
                t: function(data){return(Math.sqrt(Math.pow(this.t1(data),2) + 2*this.t1(data)*this.t2(data)*(data[1]/(2*this.R(data))) + Math.pow(this.t2(data),2)))}
            },
            functions:[
                {function: function({data, variables}){return(variables.t(data) - variables.tm)}},
                {function: function({data, variables}){return(variables.si(data) - variables.sm)}},
                {function: function({data}){return(data[0] - data[3])}},
                {function: function({data}){return(0.1047*Math.pow(data[0],2) + 0.04811*data[2]*data[3]*(14+data[1]) - 5)}},
                {function: function({data}){return(0.125 - data[0])}},
                {function: function({data, variables}){return(variables.ga(data) - variables.gm)}},
                {function: function({data, variables}){return(variables.P - variables.Pc(data))}},
            ]
        }
    }
}