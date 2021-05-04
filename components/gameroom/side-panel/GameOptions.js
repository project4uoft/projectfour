import gameRoomStyles from '../../../styles/GameRoom.module.css'

const GameOptions = () => {
    return(
        <section className={gameRoomStyles.innerSidePanelContainer}>
            {/* Links to change te game play */}
            <a className={gameRoomStyles.sidePanelButton}>Tic Tac Toe</a>
            <a className={gameRoomStyles.sidePanelButton}>Mafia</a>
            <a className={gameRoomStyles.sidePanelButton}>Bullshit</a>
            <a className={gameRoomStyles.sidePanelButton}>Big Two</a>
        </section>
    )
}

export default GameOptions;