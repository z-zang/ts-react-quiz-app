import { MouseEvent } from 'react'
import { AnswerObject } from '../App'

type Props = {
    totalQuestions: number,
    questionNumber: number,
    questionText: string,
    answers: string[],
    userAnswer: AnswerObject | undefined,
    checkAnswer: (e: MouseEvent<HTMLButtonElement>) => void,
    nextQuestion: () => void
}

const QuestionCard = ({
    totalQuestions,
    questionNumber,
    questionText,
    answers,
    userAnswer,
    checkAnswer,
    nextQuestion
}: Props) => (
    <>
        <p>Question: {questionNumber}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: questionText}}/> 
        <div className='answersContainer'>
            {answers.map((answer, index) => { 
                const isCorrect = userAnswer?.correctAnswer === answer
                const isUserClicked = userAnswer?.userAnswer === answer

                const styles = `
                    ${isCorrect && 'correct'}
                    ${!isCorrect && isUserClicked && 'incorrect'}
                    ${!isCorrect && !isUserClicked && userAnswer !== undefined && 'other'}
                `
                return (
                    <button 
                        key={index}
                        disabled={userAnswer ? true : false}
                        value={answer}
                        onClick={checkAnswer}
                        className={`answerButton ${styles}`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer}}/>
                    </button>
                )}
            )}

            <button disabled={userAnswer?.userAnswer ? false : true} className={`nextButton`} onClick={nextQuestion} value='next'>
                Next
            </button>

        </div>

    </>
)


export default QuestionCard