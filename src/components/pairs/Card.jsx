export default function Card({ card, flipCard, numberToImage, disabled }) {
  return (
    <button
      className={`flex justify-center items-center h-[110px] sm:h-[170px] rounded
        ${card.flipped
          ? (card.matched ? 'bg-zinc-400' : 'bg-zinc-600 border-4 border-black')
          : 'bg-zinc-800'}
        ${disabled ? '' : 'cursor-pointer'}`
      }
      onClick={() => flipCard(card)}
      disabled={disabled}
    >
      {card.flipped && <img src={numberToImage[card.num]} className={`w-full ${card.matched ? 'opacity-65' : ''}`}></img>}
    </button>
  )
}