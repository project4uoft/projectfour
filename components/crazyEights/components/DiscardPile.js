import React from 'react';
import CardComponent from './CardComponent'


function DiscardPile({discardPile}) {

    console.log("discard pile in component:", discardPile)
    const lastItemInArray = discardPile[discardPile.length - 1]
    console.log("last item in array:", lastItemInArray)

    return(

        <div className="cardContainer" style={{border:"1px solid black", width:"100px", justifyContent:"center"}}>
           {/* {discardPile.map(card => {
              return <CardComponent key={card.rank + card.suit} rank={card.rank} suit={card.suit} />
           })} */}
           <CardComponent rank={discardPile[discardPile.length - 1].rank} suit={discardPile[discardPile.length - 1].suit} />

        </div>
    )
}

export default DiscardPile;