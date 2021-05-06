import gameRoomStyles from '../../../styles/GameRoom.module.css'

import GameOptions from './GameOptions'
import Chatroom from './Chatroom'

const SidePanel = () => {
    return(
        <section className="flex flex-col rounded-md border-blue-900 bg-indigo-900 m-4">
            <GameOptions />
            <Chatroom />
        </section>
    )
}

export default SidePanel;