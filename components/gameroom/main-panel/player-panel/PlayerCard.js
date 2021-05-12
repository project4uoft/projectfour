import gameRoomStyles from "../../../../styles/GameRoom.module.css";

const PlayerCard = () => {
  return (
    <>
      <div className="flex flex-col object-contain p-4 m-6 text-left border-2 border-md border-grey">
        <img src="https://via.placeholder.com/70"></img>
        <div className="m-2">
          <p>Name: Danny</p>
          <p>Stats: 100</p>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
