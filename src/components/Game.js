import { useState, useRef } from 'react'
import './Game.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, 
  letters, guessedLetters, wrongLeterrs, guesses, score }) => {
  
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault();

      verifyLetter(letter);

      letterInputRef.current.focus();
    }

    return (
    <div className='game'>

      <div className="headerContainer">
        <h1>Advinhe a Palavra</h1>
        <p className='points'>
          <span>Pontuação: {score}</span>
        </p>
      </div>

      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p className='tentativa'>
        Você ainda tem {guesses} tentativas
      </p>

      <div className='wordContainer'>
        {/* Pegando a letra e o indice, vai retornar um objeto*/}
        {letters.map((letter, i) => (
          /*Se a letra digitada, está incluida em letters, imprimirá, se não */
          guessedLetters.includes(letters) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))} 
      </div>

      <div className='letterContainer'>
        <p>Tente advinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name='letter'
            maxLength="1" required 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            />
          <button>Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        <div className='span'>
          {wrongLeterrs.map((letter, i) => (
            <span key={i} >{letter}, </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Game