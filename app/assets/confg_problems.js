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
    }
}