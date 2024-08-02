import { Link } from "react-router-dom"
import MenuGameCard from "./components/MenuGameCard"
import tenzies from './assets/images/tenzies.png'
import quiz from './assets/images/quiz.png'
import pairs from './assets/images/pairs.png'

export default function Home() {
  return (
    <div className="font-mono">
      <h1 className="text-center text-5xl pt-3">React Playground</h1>
      <div className="max-w-[1000px] w-11/12 mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5">
        <MenuGameCard
          name={'Tenzies'} to={'/tenzies'}
          img={tenzies} alt={'tenzies game image'} />
        <MenuGameCard
          name={'Quiz'} to={'/quiz'}
          img={quiz} alt={'quiz game image'} />
        <MenuGameCard
          name={'Pairs'} to={'/pairs'}
          img={pairs} alt={'pairs game image'} />
        <MenuGameCard
          name={'Tic-Tac-Toe'} to={'/tic-tac-toe'}
          img={tenzies} alt={'tic-tac-toe game image'} />


      </div>
    </div>

  )
}