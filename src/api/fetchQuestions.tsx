import { shuffleAnswers } from "./utils"

export enum Difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard'
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & {
    answers: string[]
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty.toLocaleLowerCase()}&type=multiple`
    const response = await (await fetch(endpoint)).json()
    return response.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
        }
    ))
}