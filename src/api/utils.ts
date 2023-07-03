export const shuffleAnswers = (array: string[]) => (
    // quick randomizer
    [...array].sort(() => Math.random() - 0.5)
)