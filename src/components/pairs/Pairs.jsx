import { nanoid } from "nanoid";
import { useState } from "react";
import Confetti from 'react-confetti'
import heart from '../../assets/images/heart.png'
import ball from '../../assets/images/ball.png'
import honey from '../../assets/images/honey.png'
import smiley from '../../assets/images/smiley.png'
import react from '../../assets/images/react.png'
import wolf from '../../assets/images/wolf.png'
import useTopScore from "../../useTopScore";
import Card from "./Card";

const numberToImage = {
  1: heart,
  2: ball,
  3: honey,
  4: smiley,
  5: react,
  6: wolf
}

export default function Pairs() {
  const [cards, setCards] = useState(() => initCards());
  const [finished, setFinished] = useState(false);
  const [topScore, setTopScore] = useTopScore('pairs');
  const [moves, setMoves] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  if(finished) {
    setTopScore(moves)
  }

  function initCards() {
    const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]


    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    return nums.map(num => {
      return {
        id: nanoid(),
        num,
        flipped: false,
        matched: false,
      }
    });
  }

  function unflipCards() {
    setCards(prevCards => prevCards.map(card => {
      return card.matched ? card : { ...card, flipped: false }
    }))
  }

  function sameCards(cards) {
    const [card1, card2] = cards

    return card1.num == card2.num
  }

  function matchCards(cards) {
    setCards(prevCards => prevCards.map(card => {
      return cards.includes(card) ? { ...card, matched: true } : card
    }))
  }

  function flipCard(flipedCard) {
    setMoves(prevMoves => prevMoves + 1)

    setCards(prevCards => prevCards.map(card => {
      return flipedCard == card ? { ...card, flipped: true } : card
    }))

    setIsPlaying(true)
  }

  function reset() {
    setCards(initCards())
    setFinished(false)
    setIsPlaying(false)
    setMoves(0)
  }

  const flippedCards = cards.filter(card => card.flipped && !card.matched);
  if (flippedCards.length == 2) {
    if (sameCards(flippedCards)) {
      matchCards(flippedCards)
    } else {
      setTimeout(() => {
        unflipCards()
      }, 1500)
    }
  }

  const matchedCards = cards.filter(card => card.matched);
  if (matchedCards.length == cards.length && !finished) {
    setFinished(true);
  }

  const cardElements = cards.map(card => {
    return <Card
      card={card}
      flipCard={flipCard}
      numberToImage={numberToImage}
      key={nanoid()}
      disabled={flippedCards.length == 2 || card.flipped}
    />
  })

  return (
    <div className="max-w-[700px] w-11/12 mx-auto font-mono bg- rounded-lg p-5">
      <h1 className="text-center text-4xl">Pairs</h1>
      <div className="text-xl mt-3">
        <p>Moves: {moves}</p>
        <p>Best: {topScore}</p>
      </div>
      <div className='grid grid-cols-4 gap-1 mt-3'>
        {cardElements}
      </div>
      {
        isPlaying > 0 &&
        <div className="flex justify-center mt-5">
          <button
            className="p-2 rounded bg-yellow-500"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      }

      {finished && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  )
}