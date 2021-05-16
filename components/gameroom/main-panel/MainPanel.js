import PlayerPanel from "./player-panel/PlayerPanel";
import GamePlayPanel from "./game-play-panel/GamePlayPanel.js";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const MainPanel = ({ gameBoard, player, winners, players, roomId }) => {
  const classes = useStyles();
  return (
    <div>
      <GamePlayPanel player={player} gameBoard={gameBoard} winners={winners} />
      <PlayerPanel
        players={players}
        roomId={roomId}
        game={gameBoard === null ? "" : gameBoard.title}
      />
    </div>
  );
};

export default MainPanel;
