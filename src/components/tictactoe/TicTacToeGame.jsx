import { useEffect, useState } from "react"
import Confetti from 'react-confetti'
import { useSearchParams } from "react-router-dom"

const players = {
  one: 'O',
  two: 'X',
};

export default function TicTacToeGame() {
  const [tiles, setTiles] = useState(() => initTiles());
  const [currentPlayer, setCurrentPlayer] = useState(players.one);
  const [player, setPlayer] = useState(players.one);
  const [disabled, setDisabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [searchParams] = useSearchParams();

  const winConditions = {
    row1: {
      tileSet: [tiles[0], tiles[1], tiles[2]],
      strike: 'top-[16.67%] left-0 right-0'
    },

    row2: {
      tileSet: [tiles[3], tiles[4], tiles[5]],
      strike: 'top-1/2 left-0 right-0'
    },

    row3: {
      tileSet: [tiles[6], tiles[7], tiles[8]],
      strike: 'bottom-[16.67%] left-0 right-0'
    },

    col1: {
      tileSet: [tiles[0], tiles[3], tiles[6]],
      strike: 'top-0 bottom-0 left-[16.67%]'
    },

    col2: {
      tileSet: [tiles[1], tiles[4], tiles[7]],
      strike: 'top-0 bottom-0 left-1/2'
    },

    col3: {
      tileSet: [tiles[2], tiles[5], tiles[8]],
      strike: 'top-0 bottom-0 right-[16.67%]'
    },

    dia1: {
      tileSet: [tiles[0], tiles[4], tiles[8]],
      strike: 'top-1/2 left-0 right-0 rotate-45 scale-x-[141%]'
    },

    dia2: {
      tileSet: [tiles[2], tiles[4], tiles[6]],
      strike: 'top-1/2 left-0 right-0 -rotate-45 scale-x-[141%]'
    }
  };

  const isWon = hasWon();
  const isDrawn = !isWon && tiles.every(tile => tile.playedBy);
  const isFinished = isWon || isDrawn;

  useEffect(() => {
    if (searchParams.get('vs') == 'pve' && currentPlayer != player && !isFinished) {
      setDisabled(true)
      const timer = setTimeout(() => {
        cpuMove('easy');
        setDisabled(false)
      }, 800)

      return () => clearTimeout(timer);
    }
  })

  function initTiles() {
    const tiles = [];

    for (let i = 0; i <= 8; i++) {
      tiles.push({
        number: i,
        playedBy: '',
      });
    }

    return tiles;
  }

  function getCpu() {
    return player == players.one ? players.two : players.one;
  }

  function hasWon() {
    for (const { tileSet, strike } of Object.values(winConditions)) {
      const firstTile = tileSet[0];

      if (!firstTile.playedBy) {
        continue;
      }

      if (tileSet.every(tile => tile.playedBy == firstTile.playedBy)) {
        return {
          player: firstTile.playedBy,
          strike
        };
      }
    }

    return null;
  }

  function reset() {
    setTiles(() => initTiles());
    setCurrentPlayer(players.one);
    setPlayer(players.one);
    setIsStarted(false);
  }

  function playTile(tileNumber, player) {
    setTiles(prevTiles => prevTiles.map(tile => {
      return tile.number == tileNumber ? { ...tile, playedBy: player } : tile;
    }))
    setCurrentPlayer(player == players.one ? players.two : players.one);
    setIsStarted(true);
  }

  function cpuMove(difficulty) {
    const cpu = getCpu();
    playTile(mediumAi(), cpu);
  }

  function easyAi() {
    return randomTile();
  }

  function mediumAi() {
    return winningOrBlockTile() ?? randomTile();
  }

  function impossibleAi() {
    return winningOrBlockTile() ?? optimalTile() ?? randomTile();
  }

  function randomTile() {
    let randomTile = '';
    do {
      randomTile = Math.floor(Math.random() * 9);
    } while (tiles[randomTile].playedBy);
    return randomTile;
  }

  function winningOrBlockTile() {
    let blockMove;
    const cpu = getCpu();

    for (const { tileSet } of Object.values(winConditions)) {
      const playedTiles = tileSet.filter(tile => tile.playedBy);
      const unplayedTiles = tileSet.filter(tile => !tile.playedBy);

      if (unplayedTiles.length != 1) {
        continue;
      }

      const firstTile = playedTiles[0];

      if (playedTiles.every(tile => tile.playedBy == cpu)) {
        return unplayedTiles[0].number;
      }

      if (playedTiles.every(tile => tile.playedBy == firstTile.playedBy)) {
        blockMove = unplayedTiles[0].number;
      }
    }
    return blockMove;
  }

  function optimalTile() {
    const cornerTiles = [tiles[0], tiles[2], tiles[6], tiles[8]];
    const centerTile = tiles[4];

    if (cornerTiles.some(tile => tile.playedBy == player) && !centerTile.playedBy) { // one of the corner tile is played by human
      return 4; // center tile
    } else if (cornerTiles.some(tile => !tile.playedBy)){
      let index;

      do {
        index = Math.floor(Math.random() * 4);
      } while (cornerTiles[index].playedBy);

      return cornerTiles[index].number;
    }

    return null;
  }

  function getPlayerColor(player) {
    if (player == players.one) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  function choosePlayer() {
    setPlayer(players.two);
  }

  const tileElements = tiles.map(tile => {
    return (
      <button
        className={`border-2 border-black h-[100px] text-6xl 
        text-${getPlayerColor(tile.playedBy)}-500`}
        onClick={() => playTile(tile.number, currentPlayer)}
        key={tile.number}
        disabled={tile.playedBy || isWon || disabled}
      >
        <span className="font-sans">{tile.playedBy}</span>
        {/* <span className="text-base text-black">{tile.number}</span> */}
      </button>
    )
  })

  return (
    <div className="max-w-[1000px] w-11/12 my-0 mx-auto flex flex-col font-mono">
      <h1 className="text-5xl text-center mt-3">Tic-Tac-Toe</h1>
      <div className="w-full h-[250px] flex flex-col space-y-5 items-center justify-center mt-3">
        <div className="flex flex-col items-center space-y-5">
          {searchParams.get('vs') == 'pve' &&
            <p>Start game or select player</p>
          }
          <div className="flex space-x-5 text-3xl">
            <button
              className={
                `font-sans border border-black rounded text-yellow-500 py-3 px-8
            ${currentPlayer == players.one ? 'border-b-green-500 border-b-4' : ''}`
              }
              disabled={searchParams.get('vs') == 'pvp' || isStarted}
            >
              O
            </button>
            <button
              onClick={() => choosePlayer()}
              className={`font-sans border border-black rounded text-red-500 py-3 px-8
            ${currentPlayer == players.two ? 'border-b-green-500 border-b-4' : ''}`
              }
              disabled={searchParams.get('vs') == 'pvp' || isStarted}
            >
              X
            </button>
          </div>
          {isStarted &&
            <h2 className="text-2xl text-center mt-3">
              <span className={`font-sans text-${getPlayerColor(currentPlayer)}-500`}>
                {currentPlayer}
              </span>'s turn
            </h2>
          }
        </div>

        {isWon &&
          <h2 className="text-3xl mr-2">
            Winner:
            <span
              className={`text-${getPlayerColor(isWon.player)}-500
               text-4xl font-sans`}>
              {isWon.player}
            </span>
          </h2>
        }
        {isDrawn &&
          <h2 className="text-3xl mr-2">
            Draw:
            <span className="text-yellow-500 text-4xl font-sans">
              {players.one}
            </span>
            <span className="text-red-500 text-4xl font-sans">
              {players.two}
            </span>
          </h2>
        }

      </div>

      <div className="relative w-[300px] grid grid-cols-3 mx-auto">
        {isWon &&
          <div className={`border border-black absolute
            ${isWon.strike}`}></div>
        }
        {tileElements}
      </div>
      <div className="flex justify-center mt-3">
        <button className="bg-gray-500 rounded p-2 text-white" onClick={() => reset()}>Reset</button>
      </div>
      {isWon &&
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={isWon.player == players.one ? ['#FFEB3B'] : ['#f44336']} />}
    </div>
  )
}