import gameRoomStyles from '../../../styles/GameRoom.module.css'

import PlayerCard from './PlayerCard'

const PlayerPanel = () => {
    return(
        <section className={gameRoomStyles.playerPanel}>
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
        </section>
    )
}

export default PlayerPanel;