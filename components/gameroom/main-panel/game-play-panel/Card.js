import React from 'react';
const suitIcon = {
  'diamonds' : '♦',
  'clubs': '♣',
  'hearts': '♥',
  'spades': '♠',
}
const Card = ({suit, rank}) =>{
  
  
  return(
    <div style={{border:'1px solid black', padding: '5px', margin:'2px', color: suit === 'diamonds' || suit=== 'heart' ? 'red' : 'black'}}>
      {rank}{suitIcon[suit]}
    </div>
  )
}

export default Card;