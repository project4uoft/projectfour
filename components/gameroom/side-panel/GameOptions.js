import gameRoomStyles from '../../../styles/GameRoom.module.css'

const GameOptions = () => {
    return(
        <section className="flex flex-col rounded-md m-5 border-2 p-6 border-white">
            {/* Links to change te game play */}
            {/* Not sure if we can move this custom CSS into tailwind? */}
            <a className={gameRoomStyles.sidePanelButton}>Tic Tac Toe</a>
            <a className={gameRoomStyles.sidePanelButton}>Mafia</a>
            <a className={gameRoomStyles.sidePanelButton}>Bullshit</a>
            <a className={gameRoomStyles.sidePanelButton}>Big Two</a>
        </section>
    )
}

export default GameOptions;