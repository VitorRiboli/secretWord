import './GameOver.css'

const GameOver = ({retry}) => {
  return (
    <div>
        <p>Você perdeu</p>

        <button onClick={retry}>Tente de Novo!!!</button>
    </div>
  )
}

export default GameOver