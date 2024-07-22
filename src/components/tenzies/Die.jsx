export default function Die({ die, holdDie, animation }) {
  const map = {
    topLeft: [4, 5, 6],
    topRight: [2, 3, 4, 5, 6],
    middleLeft: [6],
    middleCenter: [1, 3, 5],
    middleRight: [6],
    bottomLeft: [2, 3, 4, 5, 6],
    bottomRight: [4, 5, 6]
  } 

  function hideDot(position, number) {
    if (!position.includes(number)) {
      return true;
    }

    return false
  }

  return (
    <div className={`flex justify-center ${animation && !die.isHeld ? 'animate-[wiggle_0.2s_infinite]' : ''}`} >
      <div
        onClick={holdDie}
        className={`relative ${die.isHeld ? 'bg-green-400' : 'bg-white'} w-[80px] h-[80px] rounded-lg cursor-pointer`}>

        {/* top left */}
        <i className={`${hideDot(map.topLeft, die.number) ? 'hidden' : ''} absolute top-[5%] left-[10%] fa-solid fa-circle text-lg`}></i>
        {/* top right */}
        <i className={`${hideDot(map.topRight, die.number) ? 'hidden' : ''} absolute top-[5%] right-[10%] fa-solid fa-circle text-lg`}></i>
        {/* middle left */}
        <i className={`${hideDot(map.middleLeft, die.number) ? 'hidden' : ''} absolute top-1/2 left-[10%] -translate-y-1/2 fa-solid fa-circle text-lg`}></i>
        {/* middle center */}
        <i className={`${hideDot(map.middleCenter, die.number) ? 'hidden' : ''} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fa-solid fa-circle text-lg`}></i>
        {/* middle right */}
        <i className={`${hideDot(map.middleRight, die.number) ? 'hidden' : ''} absolute top-1/2 right-[10%] -translate-y-1/2 fa-solid fa-circle text-lg`}></i>
        {/* bottom left */}
        <i className={`${hideDot(map.bottomLeft, die.number) ? 'hidden' : ''} absolute bottom-[5%] left-[10%] fa-solid fa-circle text-lg`}></i>
        {/* bottom right */}
        <i className={`${hideDot(map.bottomRight, die.number) ? 'hidden' : ''} absolute bottom-[5%] right-[10%] fa-solid fa-circle text-lg`}></i>
      </div>
    </div>
  )
}