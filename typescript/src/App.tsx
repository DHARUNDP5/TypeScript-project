import React from 'react';
import {useState} from 'react'
//components
import QuestionCard from './Components/QuestionCard';

const TOTAL_OUESTIONS = 10;

const  App=()=> {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestons]=useState([]);
  const [number,setNumber]=useState(0);
  const [userAnswers,setUserAnswers]=useState([]);
  const [score,getScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);


  const startTrivia = async ()=>{

  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = async ()=>{

  }
  return (
    <div className="App">
      <h1>TYPESCRIPT OUIZ</h1>
      <button className='start' onClick={startTrivia}>Start</button>
    <p className='score'>Score</p>
    <p>Loading Questions...</p>
    <QuestionCard
    questionNr={number+1}
    totalq={TOTAL_OUESTIONS}
    questions={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers?userAnswers[number]}
    />
    <button className='next' onClick={nextQuestion}>
      Next
    </button>
    </div>
  );
}

export default App;
