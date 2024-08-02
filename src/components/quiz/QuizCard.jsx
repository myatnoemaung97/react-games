export default function QuizCard({ quiz, chooseAnswer }) {
  const answers = [...quiz.incorrect_answers, quiz.correct_answer]
  answers.sort()

  function clickAnswer(quizId, ans) {
    chooseAnswer(quizId, ans)
  }

  const parser = new DOMParser();

  const answerElements = answers.map(ans => {
    let background = ''

    if (quiz.chosen_answer && ans == quiz.correct_answer) {
      background = 'bg-green-400'
    }
    else if (ans != quiz.correct_answer && ans == quiz.chosen_answer) {
      background = 'bg-red-400'
    }

    return (
      <button
        className={`p-2 border border-black rounded
          ${quiz.chosen_answer ? '' : 'cursor-pointer'} ${background}`}
        disabled={quiz.chosen_answer}
        key={ans}
        onClick={() => clickAnswer(quiz.id, ans)}
      >
        {parser.parseFromString(ans, 'text/html').body.textContent}
      </button>
    )
  })

  return (
    <div className="space-y-8 text-base md:text-lg">
      <p>{parser.parseFromString(quiz.question, 'text/html').body.textContent}</p>
      <div className="grid grid-cols-2 gap-8 w-full">
        {answerElements}
      </div>
    </div>
  )
}