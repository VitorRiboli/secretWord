//CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import {wordsList} from './data/words'

// Component
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
]

const guessesNumber = 6;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLeterrs, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesNumber) // quantas tentativa no total
  const [score, setScore] = useState(0) //pontuação começa com 0

  const pickWordAndPickCategory = useCallback(() => {
    // pick randon category
    const categories = Object.keys(words) //pegando as categorias dentro do objeto
    //Pegando uma categoria aleatoria, usei o floor para retornar um numero inteiro, random para ser aleatorio, object.keys para selecionar o local, lenght para percorrer todos.
    const category = categories[(Math.floor(Math.random() * Object.keys(categories).length))]
  
    //pick randon word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }  //entre chaves para retornar como array, se for colchetes [], sretornará objetos
  }, [words]);

  // Start Game
  const startGame = useCallback(() => {

    clearLettersStates();
    //pick word and pick category
    const { word, category } = pickWordAndPickCategory();
    
    //Create an array of letters
    let wordLetters = word.toLowerCase().split(""); //split retorna as letras separadas, vai retornar uma lista
    
    console.log(category, word);
    console.log(wordLetters);

    // Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    // Next Game Stage
    setGameStage(stages[1].name);
  }, [pickWordAndPickCategory]);

  // process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();
    // check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLeterrs.includes(normalizedLetter)){
      return;
    }
    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ])
      // Função para diminuir as chances
      setGuesses((actualGuesses) => actualGuesses -1);
    }

    
    
  }

  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if guesses
  useEffect(() => {
    if (guesses <= 0) {

      // reset all stages
      clearLettersStates();
      // Manda para tela finaol do jogo quando nao tem mais tentativas
      setGameStage(stages[2].name);
    }
  }, [guesses]) //useEffect monitora o dado guesses

  //check win condition
  useEffect(() => {
    //SET, função para transformar duas letras repetidas em uma so
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      //add score
      setScore((actualScore) => actualScore += 100)
      
      //restart game with new word
      startGame();
    }

  }, [guessedLetters, letters, startGame, gameStage])

    // ReStart
  const retry = () => {
    setScore(0);
    setGuesses(guessesNumber);

    setGameStage(stages[0].name)
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters} 
      guessedLetters={guessedLetters}
      wrongLeterrs={wrongLeterrs}
      guesses={guesses}
      score={score}
      />}

      {gameStage === 'end' && <GameOver 
      retry={retry}
      score={score}
      />}
    </div>
  );
}

export default App;
