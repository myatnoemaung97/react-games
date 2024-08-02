import { useState } from "react";

export default function useTopScore(key) {
  const [topScore, setTopScore] = useState(() => {
    const savedScore = localStorage.getItem(key);

    if (!savedScore) {
      localStorage.setItem(key, JSON.stringify(''));
    }

    return JSON.parse(localStorage.getItem(key))
  });

  function updateTopScore(newScore) {
    console.log(newScore)
    console.log(topScore)
    if (!topScore || newScore < topScore) {
      console.log('if')
      localStorage.setItem(key, JSON.stringify(newScore))

      setTopScore(newScore)
    }
  }

  return [topScore, updateTopScore]
}