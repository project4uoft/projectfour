import gameRoomStyles from "../../../../styles/GameRoom.module.css";

import PlayerCard from "./PlayerCard";

const PlayerPanel = ({ players, roomId, game }) => {
  console.log("players", players, roomId, game);
  return (
    <section className="flex flex-row justify-around p-2 m-4 border-2 border-black rounded-md h-1/5">
      <div className="self-auto p-2 m-2 text-center border border-gray-300 rounded w-52">
        <p>
          <strong className="text-gray-600">Room:</strong>
          <br />
          {roomId}
        </p>
        <p>
          <strong className="text-gray-600">Game:</strong> {game}
        </p>
        <ul>
          {players.map((player) => {
            return <li>{player.playerName}</li>;
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
