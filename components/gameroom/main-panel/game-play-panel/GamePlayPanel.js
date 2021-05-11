import { useEffect, useState } from "react";
import gameRoomStyles from "../../../../styles/GameRoom.module.css";
import BullShitPanel from "./BullShitPanel";

const GamePlayPanel = ({ gameTitle, gameBoard, player, winners }) => {
  const [board, setBoard] = useState(<div>Select Game to Play!</div>);

  useEffect(() => {
    if (gameTitle === "bullshit") {
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
    } else if (gameTitle === "mafia") {
      console.log("the game is mafia");
    } else if (gameTitle === "bigtwo") {
      console.log("the game is bigtwo");
    } else if (gameTitle === "tictactoe") {
      console.log("the game is tictactoe");
    }
  }, [gameTitle, gameBoard]);

  return (
    <section className="flex flex-row justify-center p-2 m-4 border-2 border-black rounded-md h-3/5">
      {board}
    </section>
  );
};

export default GamePlayPanel;
