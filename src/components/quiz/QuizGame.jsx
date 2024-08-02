import QuizCard from './QuizCard'
import { useEffect, useState } from "react"
import { nanoid } from "nanoid";
import { Link, useSearchParams } from 'react-router-dom';

export default function Quiz() {
  const [quizes, setQuizes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchParams] = useSearchParams();

  function url() {
    const params = new URLSearchParams()

    for (const [key, value] of searchParams.entries()) {
      params.append(key, value)
    }

    return `https://opentdb.com/api.php?amount=5&type=multiple&${params.toString()}`;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(url())
        .then(res => res.json())
        .then(data => {
          setQuizes(initQuizes(data.results))
          setLoading(false)
        })
    }, 5000)

    return () => clearTimeout(timer);
  }, []);

  const score = quizes.filter(quiz => quiz.chosen_answer == quiz.correct_answer).length

  function initQuizes(quizes) {
    let index = -1;
    return quizes.map(quiz => {
      index++;
      return { ...quiz, id: index, chosen_answer: '' }
    })
  }

  function chooseAnswer(quizId, ans) {
    setQuizes(prevQuizs => prevQuizs.map(quiz => {
      return quiz.id == quizId ? { ...quiz, chosen_answer: ans } : quiz
    }))

    setTimeout(() => {
      setCurrentQuestion(prevQuestion => prevQuestion + 1)
    }, 2000)
  }

  function incrementScore() {
    setScore(prevScore => prevScore + 1);
  }

  const quizElements = quizes.map(quiz => {
    return (
      <div className={`${quiz.id != currentQuestion ? 'hidden' : ''}`} key={nanoid()}>
        <QuizCard quiz={quiz} chooseAnswer={chooseAnswer} incrementScore={incrementScore} />
      </div>
    )
  })

  if (loading) {
    return (
      <div className='max-w-[600px] w-11/12 mx-auto font-mono mt-20'>
        <h1 className='text-center text-4xl md:text-5xl mb-5'>Quiz</h1>
        <div className='h-[300px] p-5'>
          <div className='animate-pulse'>
            <h1 className='text-xl'>Loading...</h1>
            <div className='w-full h-[15px] bg-slate-300 rounded-lg'></div>
            <div className='w-full h-[15px] bg-slate-300 rounded-lg mt-3'></div>
            <div className='grid grid-cols-2 mt-10 gap-y-8 gap-x-5'>
              <div className='bg-slate-300 rounded h-[50px]'></div>
              <div className='bg-slate-300 rounded h-[50px]'></div>
              <div className='bg-slate-300 rounded h-[50px]'></div>
              <div className='bg-slate-300 rounded h-[50px]'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentQuestion >= quizes.length) {
    return (
      <div className='max-w-[600px] w-11/12 mx-auto font-mono mt-24'>
        <h1 className='text-center text-4xl md:text-5xl mb-10'>Quiz</h1>
        <div>
          <p className='text-5xl text-center'>Score: {score}/{quizes.length}</p>

          <div className='flex justify-center mt-5'>
            <Link to=".." relative='path' className='text-lg bg-slate-300 py-2 px-4 rounded'>Play Again</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-[600px] w-11/12 mx-auto font-mono mt-24'>
      <h1 className='text-center text-4xl md:text-5xl mb-10'>Quiz</h1>
      <p className='mb-3'>{currentQuestion + 1}/{quizes.length}</p>
      {quizElements}
    </div>
  )
}