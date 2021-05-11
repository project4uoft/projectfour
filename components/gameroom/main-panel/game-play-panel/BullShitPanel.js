import Card from './Card'


import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:4000";
const PLAY_EVENT_BULLSHIT = "playMoveBullShit"; 
const CALL_BULLSHIT = "callBullShit"; 
const PASS_BULLSHIT = "passBullShit"; 


const BullShitPanel = ({gameBoard, player}) => {

  const [numSelected, setNumSelected] = useState([]);
  
  const router = useRouter()
  const { roomId, playerName } = router.query; // Gets roomId from URL

  const socketRef = useRef();
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
  })

  const handleCheck = (event) =>{
    console.log(numSelected)
    let isSelected = event.currentTarget.checked;
    if(isSelected){
      if(numSelected.length < 4){
        let temp = [...numSelected];
        temp.push(parseInt(event.currentTarget.value))
        setNumSelected(temp)
      }
      else{
        event.preventDefault();
        event.currentTarget.checked = false;
      }
    }
    else{
      let temp = numSelected.filter(i => i !== parseInt(event.currentTarget.value))
      setNumSelected(temp)
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    
    socketRef.current.emit(PLAY_EVENT_BULLSHIT, {
      roomId : roomId,
      playerName : player.playerName,
      cardIndices: numSelected
    });
    setNumSelected([]);
  }
  
  const handleYes = (event) =>{
    event.preventDefault();
    
    socketRef.current.emit(CALL_BULLSHIT, {
      roomId : roomId,
      playerName : player.playerName
    });
  }

  const handleNo = (event) =>{
    event.preventDefault();
    
    socketRef.current.emit(PASS_BULLSHIT, {
      roomId : roomId,
      playerName : player.playerName
    });
  }

  return(
      <div>
        <h1>BullShit</h1>
        <h2>Discard pile: {gameBoard.discardPile.length}</h2>
        {gameBoard.players.filter(p => p.playerName !== player.playerName).map(p =>(
          <div>
            Player: {p.playerName} | Cards Left: {p.playerCards.length}
          </div>
        ))}
        <h2>Current call: {gameBoard.ranks[gameBoard.currentCall]}</h2>
        {gameBoard.bluffPhase ? 
          <h2>
            {gameBoard.players[gameBoard.currentPlayerPos].playerName} played {gameBoard.lastCallAmount} cards.

            {(gameBoard.players[gameBoard.currentPlayerPos].playerName == player.playerName) ? 
            <div>Seeing if anyone believes you!</div> :
            player.playerCards.length === 0 ? null: 
              <div>
                Would you like to call {gameBoard.players[gameBoard.currentPlayerPos].playerName} bluff? <br/>
                <button onClick={handleYes}>Yes</button><br/>
                <button onClick={handleNo}>No</button>
              </div>
            
            }
          </h2>
          
        :
          <h2>It is {(gameBoard.players[gameBoard.currentPlayerPos].playerName === player.playerName) ? <span>your turn</span> : <span>{gameBoard.players[gameBoard.currentPlayerPos].playerName}'s turn</span>}</h2>
        }
        

        <form onSubmit={handleSubmit}>
          <div style={{display:'flex'}}>

          {player.playerCards.map((card,index) =>(
            <label>
            <input  key={`${card.rank}${card.suit}`}  type="checkbox" disabled={!(!gameBoard.bluffPhase && (gameBoard.players[gameBoard.currentPlayerPos].playerName === player.playerName))} 
            onChange={handleCheck}  value={index}/>
              <Card rank={card.rank} suit={card.suit}/>
            </label>
          ))}
          </div>

          <button style={{border:'1px solid black'}} type="submit" disabled={!(!gameBoard.bluffPhase && (gameBoard.players[gameBoard.currentPlayerPos].playerName === player.playerName))}>Play</button>
        </form>
        
        
      </div>
  )
}

export default BullShitPanel;