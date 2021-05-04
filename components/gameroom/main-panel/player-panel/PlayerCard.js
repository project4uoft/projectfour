import gameRoomStyles from '../../../../styles/GameRoom.module.css'


const PlayerCard = () => {
    return (<>
        <div className={gameRoomStyles.playerCard}>
            <img src="https://via.placeholder.com/150"></img>
            <div className={gameRoomStyles.stats}>
                <p>Name:</p>
                <p>Stats:</p>
            </div>
        </div>
    </>)
}

export default PlayerCard;