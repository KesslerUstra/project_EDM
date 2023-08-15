function ResultProblems({point, data}){

    return(
        <div>
            <div>
                <h5>Melhor Ponto</h5>
                <div>
                    <span>f(x) - </span>
                    <span>{point.result}</span>
                </div>
                <div>
                    <div>
                        <span>x1 - </span>
                        <span>{point['0']}</span>
                    </div>
                    <span>x2 - </span>
                    <span>{point['1']}</span>
                </div>
            </div>
        </div>
    )
}

export default ResultProblems;