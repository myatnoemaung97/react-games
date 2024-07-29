import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <Link to="/tenzies">Tenzies</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/pairs">Pairs</Link>

    </div>
  )
}