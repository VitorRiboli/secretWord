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

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const pickWordAndPickCategory = () => {
    // pick randon category
    const categories = Object.keys(words) //pegando as categorias dentro do objeto
    //Pegando uma categoria aleatoria, usei o floor para retornar um numero inteiro, random para ser aleatorio, object.keys para selecionar o local, lenght para percorrer todos.
    const category = categories[(Math.floor(Math.random() * Object.keys(categories).length))]
  
    //pick randon word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }  //entre chaves para retornar como array, se for colchetes [], sretornará objetos
  }

  // Start Game
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndPickCategory();
    
    //Create an array of letters
    let wordLetters = word.toLowerCase().split(""); //split retorna as letras separadas, vai retornar uma lista
    
    console.log(category, word);
    console.log(wordLetters);

    // Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

    // Next Game Stage
    setGameStage(stages[1].name);
  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // ReStart
  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
