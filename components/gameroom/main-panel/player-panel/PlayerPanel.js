import gameRoomStyles from "../../../../styles/GameRoom.module.css";

import PlayerCard from "./PlayerCard";

const PlayerPanel = ({ players, roomId, game }) => {
  console.log("players", players, roomId, game);
  return (
    <section>
      <div>
        <p>
          <strong>Game:</strong> {game}
        </p>
        <ul>
          {players.map((player) => {
            return <li key={player.playerName}>{player.playerName}</li>;
          })}
        </ul>
      </div>
      {/* <PlayerCard />
      <PlayerCard />
      <PlayerCard /> */}
    </section>
  );
};

export default PlayerPanel;
