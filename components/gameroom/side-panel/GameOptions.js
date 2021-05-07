import gameRoomStyles from '../../../styles/GameRoom.module.css'

const GameOptions = ({ gameSelection }) => {

    return(
        <section className="flex flex-col rounded-md m-5 border-2 p-6 border-white">
            {/* Links to change te game play */}
            {/* Not sure if we can move this custom CSS into tailwind? */}
            <a className={gameRoomStyles.sidePanelButton} onClick={() => gameSelection("tictactoe")}>Tic Tac Toe</a>
            <a className={gameRoomStyles.sidePanelButton} onClick={() => gameSelection("mafia")}>Mafia</a>
            <a className={gameRoomStyles.sidePanelButton} onClick={() => gameSelection("bullshit")}>Bullshit</a>
            <a className={gameRoomStyles.sidePanelButton} onClick={() => gameSelection("bigtwo")}>Big Two</a>
        </section>
    )
}

export default GameOptions;