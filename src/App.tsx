import { useState, MouseEvent, FormEvent } from 'react'
import QuestionCard from './components/QuestionCard'
import StartScreen from './components/StartScreen';
import { fetchQuestions, Difficulty, QuestionState } from './api/fetchQuestions';
import messages from './messages.ts'
import './App.css'

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    questionText: string;
    userAnswer: string;
    isCorrect: boolean;
    correctAnswer: string
}

const App = () => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [questionIndex ,setQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)
    const [error, setError] = useState('')

    const isFinalQuestion = questionIndex === TOTAL_QUESTIONS - 1
    const isActiveGame = !gameOver && !loading
    const dataLoaded = !loading && !error

    const saveDifficulty = (e: FormEvent<HTMLElement>) => {
        const value = (e.target as HTMLInputElement).value;
        setDifficulty(value as Difficulty);
    }

    const startQuiz = async () => {
        setLoading(true)
        const fetchResult = await fetchQuestions(TOTAL_QUESTIONS, difficulty)
        if (fetchResult instanceof Error) {
            setError(fetchResult.message)
        } else {
            setQuestions(fetchResult)
            setLoading(false)
            setGameOver(false)
        }
    }

    const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
        if (gameOver) return;
        
        const userAnswer = e.currentTarget.value;
        const isCorrect = questions[questionIndex].correct_answer === userAnswer;

        if (isCorrect) setScore(prev => prev + 1)

        const answerRecord = {
            questionText: questions[questionIndex].question,
            userAnswer,
            isCorrect,
            correctAnswer: questions[questionIndex].correct_answer
        }
        setUserAnswers((prev) => [...prev, answerRecord])
    }

    const nextQuestion = () => {
        isFinalQuestion ? setGameOver(true) 
        : setQuestionIndex(prev => prev + 1)
    }

    const playAgain = () => {
        setQuestionIndex(0)
        setUserAnswers([])
        setScore(0)
    }

    return (
        <div className='appContainer' tabIndex={-1}>
            <div className={`scoreHeader ${isActiveGame ? 'visible' : 'hidden'}`}>
                <p>Score: {score}</p>
                <p>Mode: {difficulty}</p>
            </div>
            
            <div className={`main ${gameOver ? 'tealBorder' : 'pinkBorder'}`}>

                { loading && !error && ( <p>Loading Questions...</p> )}
                { loading && error && ( 
                    <>
                        <p>Error loading data: {error}.</p> 
                        <p>Refresh and try again?</p>
                    </>
                )}
                
                { dataLoaded && gameOver && userAnswers.length === 0 && (
                    <StartScreen difficulty={difficulty} saveDifficulty={saveDifficulty} startQuiz={startQuiz}/>
                )}

                { dataLoaded && !gameOver && (
                    <QuestionCard
                        totalQuestions={TOTAL_QUESTIONS}
                        questionText={questions[questionIndex].question}
                        questionNumber={questionIndex + 1}
                        answers={questions[questionIndex].answers}
                        userAnswer={userAnswers ? userAnswers[questionIndex] : undefined}
                        checkAnswer={checkAnswer}
                        nextQuestion={nextQuestion}
                    />
                )}

                { gameOver && userAnswers.length === TOTAL_QUESTIONS && (
                    <div>
                        <strong>You got {score}/{TOTAL_QUESTIONS}!</strong>
                        <h2>{messages[score].title}</h2>
                        <p>{messages[score].subtitle}</p>
                        <button className='replayButton' onClick={playAgain}>Play again?</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default App
