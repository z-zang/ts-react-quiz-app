import { MouseEvent } from 'react'
import { AnswerObject } from '../App'

type Props = {
    totalQuestions: number,
    questionNumber: number,
    questionText: string,
    answers: string[],
    userAnswer: AnswerObject | undefined,
    checkAnswer: (e: MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard = ({
    totalQuestions,
    questionNumber,
    questionText,
    answers,
    userAnswer,
    checkAnswer
}: Props) => (
    <div className="questionCard">
        <p>Question: {questionNumber}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: questionText}}/> 
        <div className='answersContainer'>
            {answers.map((answer, index) => (

                <div key={index} className='buttonWrapper'>
                    <button 
                        disabled={userAnswer ? true : false}
                        value={answer}
                        onClick={checkAnswer}
                        className={userAnswer?.correctAnswer === answer ? 'correct' : ''}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
)


export default QuestionCard