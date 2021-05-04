import gameRoomStyles from '../../../styles/GameRoom.module.css'

import GameOptions from './GameOptions'
import Chatroom from './Chatroom'

const SidePanel = () => {
    return(
        <section className={gameRoomStyles.sidePanel}>
            <GameOptions />
            <Chatroom />
        </section>
    )
}

export default SidePanel;