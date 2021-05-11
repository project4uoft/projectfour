import Head from 'next/head'

import PlayerPanel from './player-panel/PlayerPanel'
import GamePlayPanel  from './game-play-panel/GamePlayPanel.js'

import styles from '../../../styles/GameRoom.module.css'


const MainPanel = ({gameTitle, gameBoard, player, winners}) => {
    return (
    <div className="flex flex-col w-full">
        <GamePlayPanel gameTitle={gameTitle} player={player} gameBoard={gameBoard} winners={winners}/>
        <PlayerPanel />
    </div>
  )
}

export default MainPanel;
