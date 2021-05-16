import { useEffect, useState } from "react";
import gameRoomStyles from "../../../../styles/GameRoom.module.css";
import BullShitPanel from "./BullShitPanel";
import BigTwoPanel from "./BigTwoPanel";

const GamePlayPanel = ({ gameBoard, player, winners }) => {
  const [board, setBoard] = useState(<div>Select Game to Play!</div>);

  useEffect(() => {
    if(gameBoard!== null){
      if (gameBoard.title === "bullshit") {
        if (winners) {
          setBoard(
            <div>
              The winners are{" "}
              {winners.map((winner) => winner.playerName).toString()}
            </div>
          );
        } else {
          setBoard(<BullShitPanel player={player} gameBoard={gameBoard} />);
        }
      } else if (gameBoard.title === "mafia") {
        console.log("the game is mafia");
      } else if (gameBoard.title === "bigtwo") {
        console.log(winners)
        if (winners) {
          setBoard(
            <div>
              The winners are{" "}
              {winners.map((winner) => winner.playerName).toString()}
            </div>
          );
        } else {
          setBoard(<BigTwoPanel player={player} gameBoard={gameBoard} />);
        }
      } else if (gameBoard.title === "tictactoe") {
        console.log("the game is tictactoe");
      }
    }
  }, [gameBoard, winners]);

  return <section>{board}</section>;
};

export default GamePlayPanel;
