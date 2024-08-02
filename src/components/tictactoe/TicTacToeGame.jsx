import { useState } from "react"
import Confetti from 'react-confetti'

const players = {
  one: 'O',
  two: 'X',
}

const winConditions = {
  row1: [1, 2, 3],
  row2: [4, 5, 6],
  row3: [7, 8, 9],
  col1: [1, 4, 7],
  col2: [2, 5, 8],
  col3: [3, 6, 9],
  dia1: [1, 5, 9],
  dia2: [3, 5, 7]
}

export default function TicTacToeGame() {
  const [tiles, setTiles] = useState(() => initTiles())
  const [currentPlayer, setCurrentPlayer] = useState(players.one)
  const [isWon, setIsWon] = useState(null)

  function initTiles() {
    const tiles = []

    for (let i = 1; i <= 9; i++) {
      tiles.push({
        number: i,
        playedBy: '',
      })
    }

    return tiles;
  }

  function reset() {
    setTiles(() => initTiles())
    setCurrentPlayer(players.one)
    setIsWon(null)
  }

  function clickTile(tileNumber) {
    setTiles(prevTiles => prevTiles.map(tile => {
      return tile.number == tileNumber ? { ...tile, playedBy: currentPlayer } : tile
    }))
    setCurrentPlayer(prevCurrentPlayer => prevCurrentPlayer == players.one ? players.two : players.one)
  }

  function hasWon() {
    for (const winCondition of Object.values(winConditions)) {
      const checkedTiles = tiles.filter(tile => winCondition.includes(tile.number))
      const firstTile = checkedTiles[0]

      if (!firstTile.playedBy) {
        continue;
      }

      const filteredTiles = checkedTiles.filter(tile => tile.playedBy == firstTile.playedBy)

      if (filteredTiles.length == 3) {
        return firstTile.playedBy;
      }
    }

    return null;
  }

  if (!isWon) {
    const won = hasWon();
    if (won) {
      setIsWon(won)
    }
  }

  const tileElements = tiles.map(tile => {
    return (
      <button
        className={`border-2 border-black h-[100px] text-6xl 
          ${tile.playedBy == players.one ? 'text-yellow-500' : 'text-red-500'}`}
        onClick={() => clickTile(tile.number)}
        key={tile.number}
        disabled={tile.playedBy}
      >
        {tile.playedBy}
        {/* {tile.number} */}
      </button>
    )
  })

  return (
    <div className="max-w-[1000px] w-11/12 my-0 mx-auto flex flex-col font-mono">
      <h1 className="text-5xl text-center mt-3">Tic-Tac-Toe</h1>
      <div className="w-full h-[150px] flex items-center justify-center">
        {isWon &&
          <h2 className="text-3xl mr-2">
            Winner:
            <span className={`${isWon == players.one ? 'text-yellow-500' : 'text-red-500'} font-semibold`}>
              {isWon}
            </span>
          </h2>
        }
      </div>
      <div className="w-[300px] grid grid-cols-3 mx-auto">
        {tileElements}
      </div>
      <div className="flex justify-center mt-3">
        <button className="bg-gray-500 rounded p-2 text-white" onClick={() => reset()}>Reset</button>
      </div>
      {isWon &&
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={isWon == players.one ? ['#FFEB3B'] : ['#f44336']} />}
    </div>
  )
}