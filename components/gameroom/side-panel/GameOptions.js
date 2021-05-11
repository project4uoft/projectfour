import gameRoomStyles from "../../../styles/GameRoom.module.css";

<<<<<<< HEAD
const GameOptions = () => {
  return (
    <section className="flex flex-col p-6 m-5 border-2 border-white rounded-md">
      {/* Links to change te game play */}
      {/* Not sure if we can move this custom CSS into tailwind? */}
      <a className={gameRoomStyles.sidePanelButton}>Tic Tac Toe</a>
      <a className={gameRoomStyles.sidePanelButton}>Mafia</a>
      <a className={gameRoomStyles.sidePanelButton}>Bullshit</a>
      <a className={gameRoomStyles.sidePanelButton}>Big Two</a>
    </section>
  );
};
=======

const GameOptions = ({handleClick}) => {

  return(
      <section className="flex flex-col rounded-md m-5 border-2 p-6 border-white">
          {/* Links to change te game play */}
          {/* Not sure if we can move this custom CSS into tailwind? */}
          <a className={gameRoomStyles.sidePanelButton} onClick={()=>handleClick('tictactoe')}>Tic Tac Toe</a>
          <a className={gameRoomStyles.sidePanelButton} onClick={()=>handleClick('mafia')}>Mafia</a>
          <a className={gameRoomStyles.sidePanelButton} onClick={()=>handleClick('bullshit')}>Bullshit</a>
          <a className={gameRoomStyles.sidePanelButton} onClick={()=>handleClick('bigtwo')}>Big Two</a>
      </section>
  )
}
>>>>>>> main

export default GameOptions;
