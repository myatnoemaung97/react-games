import Home from "./Home"
import Tenzies from "./components/tenzies/Tenzies"
import Quiz from "./components/quiz/Quiz"
import QuizGame from "./components/quiz/QuizGame";
import Pairs from "./components/pairs/Pairs";

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

  </>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}