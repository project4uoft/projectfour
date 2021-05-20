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

const MainPanel = ({
  gameTitle,
  gameBoard,
  player,
  winners,
  players,
  roomId,
  game,
}) => {
  console.log("gameboard: ", gameBoard);
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <Toolbar />
        {gameBoard && gameBoard.players.length > 1 ? (
          <>
            <GamePlayPanel
              gameTitle={gameTitle}
              player={player}
              gameBoard={gameBoard}
              winners={winners}
            />
            <PlayerPanel players={players} roomId={roomId} game={game} />
          </>
        ) : (
          <h1>{`Waiting for players to join ${gameBoard?.title} game...`}</h1>
        )}
      </main>
    </>
  );
};

export default MainPanel;
