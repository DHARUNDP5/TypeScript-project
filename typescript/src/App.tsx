import React from 'react';
import {useState} from 'react'
import { fetchOuizQuestions } from './API';
//components
import QuestionCard from './Components/QuestionCard';
//types
import { QuestionState,Difficulty } from './API';

//styles
import './index.css'

export type AnswerObject ={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_OUESTIONS = 10;

const  App=()=> {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([]);
  const [number,setNumber]=useState(0);
  const [userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);

  // console.log(fetchOuizQuestions(TOTAL_OUESTIONS,Difficulty.EASY));
console.log(questions)

/////////////
  const startTrivia = async ()=>{

    setLoading(true);
    setGameOver(false);

  const newQuestions = await fetchOuizQuestions(
    TOTAL_OUESTIONS,
    Difficulty.EASY
  );

  setQuestions(newQuestions);
  setScore(0);
  setUserAnswers([]);
  setNumber(0);
  setLoading(false);

  };

////////
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer=e.currentTarget.value;
      //correct answer checking
      const  correct = questions[number].correct_answer === answer;
    //score add
    if(correct) setScore(prev=>prev+1);
    //save ans for user ans
    const answerObject={
      question: questions[number].question,
      answer,
      correct,
      correctAnswer:questions[number].correct_answer,

    }
    setUserAnswers((prev)=>[...prev,answerObject]);
    }

  };

  const nextQuestion = async ()=>{
    //nextques
    const nextQuestion=number+1;
    if(nextQuestion===TOTAL_OUESTIONS){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }

  }
  return (
    <>
    <div className=" ">
      <h1 className=''>TYPESCRIPT OUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_OUESTIONS ?(
      <button className='start' onClick={startTrivia}>
        Start
        </button>
      ):null}
    {!gameOver?<p className='score'>Score:{score}</p> : null}
    {loading && <p>Loading Questions...</p>}
    {!loading && !gameOver &&(
    <QuestionCard
    questionNr={number+1}
    totalq={TOTAL_OUESTIONS}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers ? userAnswers[number]:undefined}
    callback={checkAnswer}
    /> 
    )}

    {!gameOver && 
    !loading && userAnswers.length === number+1 &&
    number !== TOTAL_OUESTIONS -1 ? (
    <button className='next' onClick={nextQuestion}>
      Next
    </button>
    ):null}
    </div>
    </>
  );
}

export default App;
