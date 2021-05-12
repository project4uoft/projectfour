import React from 'react';
import CardComponent from './CardComponent'


function DiscardPile({discardPile}) {

    console.log("discard pile in component:", discardPile)

    return(

        <div className="cardContainer" style={{border:"1px solid black", width:"100px", justifyContent:"center"}}>
           {discardPile.map(card => {
              return <CardComponent rank={card.rank} suit={card.suit} />
           })}

        </div>
    )
}

export default DiscardPile;