import { shuffleAnswers } from "./utils"

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
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
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=9&type=multiple`
    const response = await (await fetch(endpoint)).json()
    return response.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
        }
    ))
}