import React from 'react';
import {useState} from 'react'
import { fetchOuizQuestions } from './API';
import back from './Images/bg.jpg'
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
    <div className=''>
     {/* <img className="bg-cover w-[100%]" src={back}></img> */}
    <div className="">
       <h1 className='text-lime-600 flex justify-center mt-[8%] text-[60px] font-semibold'>TYPESCRIPT OUIZ</h1>
       </div>

<div className='flex justify-center mt-[10%] text-[40px]'>

      {gameOver || userAnswers.length === TOTAL_OUESTIONS ?(
      <button className='bg-[#6496EB] text-white text-[30px] w-40 h-14 rounded-full flex items-center text-center justify-center' onClick={startTrivia}>
        Start
        </button>
      ):null}
      </div>

      <div className='flex justify-center text-[40px]'>
    {!gameOver?<p className='mt-[-8%] text-pink-500'>Score:{score}</p> : null}
    </div>


    <div className='flex justify-center text-[40px] shadow-lg w-[1100px] items-center shadow-sky-700 ml-[600px] pl-[10px]'>
      <div className="flex items-center mb-4">
    <input type="radio" value="" name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
   
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
    <button className='bg-[#6496EB] text-white text-[30px] w-[100px] h-14 rounded-full mt-[42%] mr-[10px]' onClick={nextQuestion}>
      Next
    </button>
    ):null}
    </div>
    </div>
     </div>
    
  );
}

export default App;
