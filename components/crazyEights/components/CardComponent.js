import React from 'react';


function Card({suit, rank, value, selectedCard}) {

    return(
        <button className="cardContainer" value={value} onClick={() => selectedCard(suit, rank, value)}style={{border:"1px solid black", width:"100px", justifyContent:"center"}}>
            <div className="cardRank">{rank}</div>
            <div className="cardSuit">{suit}</div>
            <div className="cardRank">{rank}</div>

        </button>
    )
}

export default Card;