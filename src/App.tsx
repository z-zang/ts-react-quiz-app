import { useState, MouseEvent, FormEvent, FormEventHandler } from 'react'
import QuestionCard from './components/QuestionCard'
import { fetchQuestions, Difficulty, QuestionState } from './api/fetchQuestions';
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

    const isFinalQuestion = questionIndex === TOTAL_QUESTIONS - 1

    const startQuiz = async () => {
        setLoading(true)
        setGameOver(false)
        const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, difficulty)
        
        setQuestions(newQuestions)
        setQuestionIndex(0)
        setUserAnswers([])
        setScore(0)
    
        setLoading(false)
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

    const saveDifficulty = (e: FormEvent<HTMLDivElement>) => {
        const value = (e.target as HTMLInputElement).defaultValue
        setDifficulty(value)
    }

    return (
        <main className='main'>
            { (gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
                <div className='startScreen'>
                    <p>Choose difficulty:</p>
                    
                    <div onChange={e => saveDifficulty(e)} className='difficultySelect'>
                        {Object.values(Difficulty).map((difficulty, index) => (
                            <div key={index}>
                                <input 
                                    type="radio" 
                                    name="difficulty"
                                    defaultChecked={difficulty === "easy"}
                                    id={difficulty}
                                    value={difficulty}
                                /> {difficulty}
                            </div>
                        ))}
                    </div>

                    
                    <button onClick={startQuiz}>Start Quiz!</button>
                </div>
            )}

            { !gameOver && !loading && <p>Score: {score}</p> }
            { !gameOver && !loading && <p>Mode: {difficulty}</p> }
            { loading && <p>Loading Questions...</p> }
            
            { !loading && !gameOver && (
                <QuestionCard
                    totalQuestions={TOTAL_QUESTIONS}
                    questionText={questions[questionIndex].question}
                    questionNumber={questionIndex + 1}
                    answers={questions[questionIndex].answers}
                    userAnswer={userAnswers ? userAnswers[questionIndex] : undefined}
                    checkAnswer={checkAnswer}
                />
            )}

            { !gameOver && !loading && !isFinalQuestion && (userAnswers.length === questionIndex + 1) && (
                <button onClick={nextQuestion}>
                    Next
                </button>
            )}
        </main>
    )
}

export default App
