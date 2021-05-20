import PlayerPanel from "./player-panel/PlayerPanel";
import GamePlayPanel from "./game-play-panel/GamePlayPanel.js";

const MainPanel = ({
  gameBoard,
  player,
  winners,
  players,
  roomId,
}) => {
  
  return (
    <div>
      <GamePlayPanel
        player={player}
        gameBoard={gameBoard}
        winners={winners}
      />
      <PlayerPanel players={players} roomId={roomId} game={gameBoard === null ? '' : gameBoard.title} />
    </div>
  );
};

export default MainPanel;
