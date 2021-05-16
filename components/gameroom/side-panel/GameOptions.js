import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import gameRoomStyles from "../../../styles/GameRoom.module.css";

const GameOptions = ({ handleClick, gameBoard }) => {
  return (
    <>
      <a
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("tictactoe")}
      >
        Tic Tac Toe
      </a>
      <a
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("mafia")}
      >
        Mafia
      </a>
      <a
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("bullshit")}
      >
        Bullshit
      </a>
      <a
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("bigtwo")}
      >
        Big Two
      </a>
    </>
  );
};

export default GameOptions;
