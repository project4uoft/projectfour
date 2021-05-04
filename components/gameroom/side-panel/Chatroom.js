import gameRoomStyles from '../../../styles/GameRoom.module.css'

const Chatroom = () => {
    return(
        <section className={gameRoomStyles.innerSidePanelContainer}>
            <div>
                <p>Container for the chat feature to go in</p>
                {/* <textarea placeholder="type your message here..."></textarea> */}
            </div>
        </section>
    )
}

export default Chatroom;