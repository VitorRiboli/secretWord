import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className="start" >
        <h2>Jogo da Forca</h2>
        <p>Clique no botão abaixo para jogar</p>
        <button onClick={startGame} >Iniciar</button>
    </div>
  )
}

export default StartScreen