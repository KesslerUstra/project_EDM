import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import styles from './ResultProblems.module.css';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
)

function ResultProblems({generations = [], data= {}}){

    const data2 = {
        labels: [...Array(generations.length).keys()].map(number => number + 1),
        datasets: [{
            borderColor: '#6CA6FE',
            data: generations.length > 1 ?generations.map(e => e.result) : []
        }]
    };

    const options = {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
                color: "#232323",
                font: {
                    weight: "bolder",
                    
                }
            }
          },
          x: {
            ticks: {
                color: "#232323",
                font: {
                    weight: "bolder",
                    size: 13
                }
            }
          }
        },
        plugins: {
            tooltip: {
                bodyFont: {
                    size: 13,
                    weight: "bold"
                }
            }
        }
    };

    function createBestPoint(){
        let bestPoint = generations[(generations.length - 1)];
        return(
            <>
                {bestPoint ?
                    <>
                        <div className={styles.children_box_best_point} style={{marginBottom: '12px'}}>
                            <span className={styles.variable_best_point}>f()</span>
                            <span className={styles.result_best_point}>{bestPoint?.result.toFixed(4)}</span>
                        </div>
                        {[...Array(data.dimension.value).keys()].map((e) => (
                            <div key={e} className={styles.children_box_best_point}>
                                <span className={styles.variable_best_point}>{`x${e+1}`}</span>
                                <span className={styles.x_best_point}>{bestPoint?.[e]}</span>
                            </div>
                        ))
                        }
                    </>
                :
                    ""
                }
            </>
        )
    }

    return(
        <div className={styles.result_problem_box}>
            <div className={styles.result_one}>
                <div className={styles.best_point_box}>
                    <h5>Melhor Ponto</h5>
                    <div className={styles.best_point_values_box}>
                        {createBestPoint()}
                    </div>
                </div>
                <div className={styles.graph_gen_box}>
                    <h5>Gráfico das Gerações</h5>
                    <div className={styles.graph_gen_values_box}>
                        {generations.length > 0 &&
                            <Line data={data2} options={options} updateMode={'resize'} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultProblems;