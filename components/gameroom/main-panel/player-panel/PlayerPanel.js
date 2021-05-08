import gameRoomStyles from '../../../../styles/GameRoom.module.css'

import PlayerCard from './PlayerCard'

const PlayerPanel = () => {
    return(
        <section className="flex flex-row rounded-md border-2 border-black justify-around h-1/4 m-4 p-2">
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
        </section>
    )
}

export default PlayerPanel;