import { Link } from "react-router-dom"

export default function HomeLink() {
  return (
    <Link
      to="/"
      relative="path"
      className="text-lg rounded bg-gray-400 py-1 px-2  fixed top-[15px] left-[15px]"
    >
      <i class="fa-solid fa-house"></i> Home
    </Link>
  )
}