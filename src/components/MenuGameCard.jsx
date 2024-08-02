import { Link } from "react-router-dom"

export default function MenuGameCard({to, alt, name, img}) {
  return (
    <Link to={to}>
      <div className="bg-slate-500 p-2 rounded-lg border-4 border-white hover:border-black">
        <img className="w-full h-[300px]" src={img} alt={alt} />
        <div className="pt-2">
          <p className="text-center text-2xl font-bold">{name}</p>
        </div>
      </div>
    </Link>
  )
}