import './Game.css'

const Game = ({ verifyLetter }) => {
  return (
    <div className='game'>

      <div className="headerContainer">
        <h1>Advinhe a Palavra</h1>
        <p className='points'>
          <span>Pontuação: 000</span>
        </p>
      </div>

      <h3 className='tip'>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>

      <div className='wordContainer'>
        <span className='letter'>a</span>
        <span className="blankSquare"></span>
      </div>

      <div className='letterContainer'>
        <p>Tente advinhar uma letra da palavra</p>
        <form>
          <input type="text" name='letter'
            maxLength="1" required />
          <button>Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        <div className='span'>
          <span>a,</span>
          <span>b,</span>
          <span>c,</span>
        </div>
      </div>

    </div>
  )
}

export default Game