export default function Pairs() {
  const cards = []

  for (let i = 0; i < 12; i++) {
    cards.push(<div className="bg-blue-500 flex justify-center">
      <div className="bg-black w-2/3 h-[70px]">

      </div>
    </div>)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='grid grid-cols-4 gap-5 bg-red-500 w-3/4'>
        {cards}        
      </div>

    </div>
  )
}