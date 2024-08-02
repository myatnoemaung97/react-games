import Die from "./Die"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import { useElapsedTime } from "use-elapsed-time";
import HomeLink from "../HomeLink";

export default function Tenzies() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [topScores, setTopScores] = useState(JSON.parse(localStorage.getItem('topScores')))
  const [isPlaying, setIsPlaying] = useState(false)
  const { elapsedTime, reset } = useElapsedTime({ isPlaying: isPlaying })
  const [animation, setAnimation] = useState(false)

  const heldDice = dice.filter(die => die.isHeld)

  const firstDieNumber = dice[0].number;
  const sameNumberDice = dice.filter(die => die.number == firstDieNumber)

  if (heldDice.length == 10 && sameNumberDice.length == 10 && !tenzies) {
    setTenzies(true)
  }

  if (tenzies && isPlaying) {
    setIsPlaying(false)

    if (!topScores) {
      localStorage.setItem('topScores', JSON.stringify({ time: Math.round(elapsedTime * 10) / 10, rolls: rolls }))
      setTopScores({ time: Math.round(elapsedTime * 10) / 10, rolls: rolls })
    }

    if (topScores && rolls < topScores.rolls) {
      localStorage.setItem('topScores', JSON.stringify({ ...topScores, rolls: rolls }))
      setTopScores(prevTopScores => ({ ...prevTopScores, rolls: rolls }))
    }

    if (topScores && elapsedTime < topScores.time) {
      localStorage.setItem('topScores', JSON.stringify({ ...topScores, time: Math.round(elapsedTime * 10) / 10 }))
      setTopScores(prevTopScores => ({ ...prevTopScores, time: Math.round(elapsedTime * 10) / 10 }))
    }
  }

  function allNewDice() {
    const dice = [];

    for (let i = 0; i < 10; i++) {
      dice.push({
        id: nanoid(),
        number: randomNumber(),
        isHeld: false,
      })
    }

    return dice
  }

  function randomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function roll() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : { ...die, number: randomNumber() }
    }))

    setRolls(prevRolls => prevRolls + 1)

    setIsPlaying(true)

    setAnimation(true)

    setTimeout(() => {
      setAnimation(false)
    }, 200);
  }

  function holdDie(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id == id ? { ...die, isHeld: !die.isHeld } : die
    }))

    setIsPlaying(true)
  }

  function playAgain() {
    setDice(allNewDice());
    setTenzies(false)
    setRolls(0)
    reset()
  }

  const dieElements = dice.map(die => <Die die={die} holdDie={() => holdDie(die.id)} key={die.id} animation={animation} />)

  return (
    <>
      <HomeLink />
      <div className="max-w-[600px] w-11/12 my-0 mx-auto p-3 mt-5 rounded-lg bg-zinc-500 font-mono shadow-2xl">
        <h1 className="text-4xl font-semibold text-center">Tenzies</h1>
        <div className="flex justify-evenly mt-5 text-sm md:text-base">
          <div className="bg-slate-300 p-3 rounded-lg">
            <h1 className="text-lg md:text-xl mb-2">Top Scores</h1>
            <p>Time: {topScores?.time || ''}s</p>
            <p>Rolls: {topScores?.rolls || ''}</p>
          </div>
          <div className="bg-slate-300 p-3 rounded-lg">
            <h1 className="text-lg md:text-xl mb-2">Your Scores</h1>
            <p>Time: {Math.round(elapsedTime * 10) / 10}s</p>
            <p>Rolls: {rolls}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-5 gap-5 mt-10">
          {dieElements}
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={tenzies ? playAgain : roll} className="bg-yellow-400 px-5 py-2 rounded">{tenzies ? 'Play Again' : 'Roll'}</button>
        </div>
        {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      </div>
    </>

  )
}