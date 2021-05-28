import React from 'react';
import CardComponent from './CardComponent'


function DiscardPile({discardPile}) {

    return(

        <div className="cardContainer" style={{border:"1px solid black", width:"100px", justifyContent:"center"}}>
           {discardPile && <CardComponent rank={discardPile[discardPile.length - 1].rank} suit={discardPile[discardPile.length - 1].suit} />}
        </div>
    )
}

export default DiscardPile;