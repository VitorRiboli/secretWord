import './GameOver.css'

const GameOver = ({ retry, score }) => {
  return (
    <div>
      
      <div className='box'>
        <h1 className='title'>Fim de Jogo!!!</h1>
        <h2 className='subtitle'>A sua pontuação foi de: <span>{score}</span></h2>

        <button onClick={retry}>Tente de Novo!!!</button>
      </div>

    </div>
  )
}

export default GameOver