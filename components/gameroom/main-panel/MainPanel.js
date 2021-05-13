import PlayerPanel from "./player-panel/PlayerPanel";
import GamePlayPanel from "./game-play-panel/GamePlayPanel.js";

const MainPanel = ({
  gameTitle,
  gameBoard,
  player,
  winners,
  players,
  roomId,
  game,
}) => {
  return (
    <div>
      <GamePlayPanel
        gameTitle={gameTitle}
        player={player}
        gameBoard={gameBoard}
        winners={winners}
      />
      <PlayerPanel players={players} roomId={roomId} game={game} />
    </div>
  );
};

export default MainPanel;
