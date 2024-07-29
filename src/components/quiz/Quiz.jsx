import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Quiz() {
  const [options, setOptions] = useState({
    category: '', difficulty: ''
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
  }, [])

  function gameUrl(options) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      if (value) {
        params.append(key, value)
      }
    }

    return params.toString();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setOptions(prevOptions => {
      return { ...prevOptions, [name]: value }
    })
  }

  const cateOptions = categories.map(cate => {
    return <option value={cate.id} key={cate.id} className="text-sm md:text-base lg:text-lg">{cate.name}</option>
  })

  return (
    <div className="w-screen h-screen flex justify-center font-mono">
      <div className="max-w-[600px] w-11/12 pt-10">
        <h1 className="text-center text-5xl">Quiz</h1>
        <div className="flex flex-col text-lg md:text-xl mt-12 gap-2">
          <label htmlFor="category">Choose category</label>
          <select
            className="rounded py-2 px-3 bg-slate-300"
            value={options.category}
            onChange={(event) => handleChange(event)}
            name="category"
          >
            <option value="" className="text-sm md:text-base lg:text-lg">All</option>
            {cateOptions}
          </select>
        </div>

        <div className="flex flex-col text-lg md:text-xl mt-10 gap-2">
          <label htmlFor="difficulty">Choose difficulty</label>
          <select
            className="rounded py-2 px-3 bg-slate-300"
            value={options.difficulty}
            onChange={(event) => handleChange(event)}
            name="difficulty"
          >
            <option value="" className="text-sm md:text-base lg:text-lg">All</option>
            <option value="easy" className="text-sm md:text-base lg:text-lg">Easy</option>
            <option value="medium" className="text-sm md:text-base lg:text-lg"> Medium</option>
            <option value="hard" className="text-sm md:text-base lg:text-lg">Hard</option>
          </select>
        </div>

        <div className="flex justify-center mt-10">
          <Link to={`play?${gameUrl(options)}`} className="text-lg bg-slate-300 py-2 px-4 rounded">Play</Link>
        </div>
      </div>
    </div>
  )
}