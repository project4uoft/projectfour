import gameRoomStyles from '../../../../styles/GameRoom.module.css'


const PlayerCard = () => {
    return (<>
        <div className="flex flex-col border-md border-2 border-grey m-6 text-left p-4 object-contain">
            <img src="https://via.placeholder.com/70"></img>
            <div className="m-2">
                <p>Name: Danny</p>
                <p>Stats: 100</p>
            </div>
        </div>
    </>)
}

export default PlayerCard;