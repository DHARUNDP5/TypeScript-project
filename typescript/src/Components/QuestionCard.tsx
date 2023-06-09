import React from 'react'
import { AnswerObject } from '../App';
type Props = {
    question: string;
    answers: string[];
    callback: (e:React.MouseEvent<HTMLButtonElement>) =>void;
    userAnswer:AnswerObject | undefined;
    questionNr: number;
    totalq: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalq,
}) => (
    
<div>
<p className='number'>
            Questions:{questionNr} / {totalq}
        </p>
        <p dangerouslySetInnerHTML={{ __html :question}}/>
        <div>
            {answers.map((answer) => (
                <div key={answer}>
                    <button disabled={userAnswer ? true :false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    </button>
                </div>
        )) }
        </div>
</div>

);


export default QuestionCard;