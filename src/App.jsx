import Home from "./Home"
import Tenzies from "./components/tenzies/Tenzies"
import Quiz from "./components/quiz/Quiz"
import QuizGame from "./components/quiz/QuizGame";
import Pairs from "./components/pairs/Pairs";
import TicTacToe from "./components/tictactoe/TicTacToe";
import TicTacToeGame from "./components/tictactoe/TicTacToeGame";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Home />} />
    <Route path='/tenzies' element={<Tenzies />} />
    <Route path='/quiz' element={<Quiz />} />
    <Route path='/quiz/play' element={<QuizGame />} />
    <Route path='/pairs' element={<Pairs />} />
    <Route path='/tic-tac-toe' element={<TicTacToe />} />
    <Route path='/tic-tac-toe/play' element={<TicTacToeGame />} />
  </>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}