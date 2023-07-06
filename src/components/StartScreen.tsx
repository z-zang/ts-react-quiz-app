import { FormEvent } from 'react'
import { Difficulty } from '../api/fetchQuestions'

type Props = {
    saveDifficulty: (e: FormEvent<HTMLElement>) => void,
    startQuiz: () => void,
    difficulty: Difficulty
}

const StartScreen = ({
    saveDifficulty,
    startQuiz,
    difficulty
}: Props) => {
  return (
        <>
            <h1>Mean Quiz</h1>
            <h2>Choose difficulty:</h2>
            <div onChange={e => saveDifficulty(e)} className='difficultySelect'>
                {Object.values(Difficulty).map((difficultyOption, index) => (
                    <button key={index} className='difficultyButton' onClick={e => saveDifficulty(e)} value={difficultyOption}>
                        <input 
                            readOnly
                            className='checkbox'
                            type="checkbox" 
                            name="difficulty"
                            checked={difficultyOption === difficulty}
                            id={difficultyOption}
                            value={difficultyOption}
                        />
                        <label htmlFor={difficultyOption}>{difficultyOption}</label>
                    </button>
                ))}
            </div>
            <button className='startButton' onClick={startQuiz}>Start Quiz!</button>
        </>
    )
}

export default StartScreen