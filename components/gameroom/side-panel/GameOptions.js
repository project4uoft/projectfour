import gameRoomStyles from "../../../styles/GameRoom.module.css";

const GameOptions = ({ handleClick }) => {
  return (
    <section className="flex flex-col p-6 m-5 border-2 border-white rounded-md">
      {/* Links to change te game play */}
      {/* Not sure if we can move this custom CSS into tailwind? */}
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
    </section>
  );
};

export default GameOptions;
