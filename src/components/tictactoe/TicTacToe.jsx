import { Link, useNavigate } from "react-router-dom"
import useParamsBuilder from "../../hooks/useParamsBuilder"
import { useEffect } from "react"

const options = {
  mode: {
    classic: 'classic',
    infinite: 'infinite'
  },

  vs: {
    pvp: 'pvp',
    pve: 'pve'
  }
}

export default function TicTacToe() {
  const [params, setParams] = useParamsBuilder({
    mode: '', vs: ''
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (params.includes('vs')) {
      navigate(`play?${params}`)
    }
  }, [params])

  return (
    <div className="max-w-[1000px] w-11/12 my-0 mx-auto flex flex-col font-mono">
      <h1 className="text-5xl text-center mt-3">Tic-Tac-Toe</h1>
      <div className={`mt-10 w-full flex justify-center space-x-10 ${!params.includes('mode') ? '' : 'hidden'}`}>
        <button className="text-2xl bg-slate-400 rounded p-3" onClick={() => setParams('mode', options.mode.classic)}>Classic</button>
        <button className="text-2xl bg-slate-400 rounded p-3" onClick={() => setParams('mode', options.mode.infinite)}>Infinite</button>
      </div>
      <div className={`mt-10 w-full flex justify-center space-x-10 ${params.includes('mode') ? '' : 'hidden'}`}>
        <button className="text-2xl bg-slate-400 rounded p-3" onClick={() => setParams('vs', options.vs.pvp)}>PvP</button>
        <button className="text-2xl bg-slate-400 rounded p-3" onClick={() => setParams('vs', options.vs.pve)}>PvE</button>
      </div>
    </div>
  )
}