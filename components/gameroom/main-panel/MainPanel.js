import Head from 'next/head'

import PlayerPanel from './player-panel/PlayerPanel'
import GamePlayPanel  from './game-play-panel/GamePlayPanel.js'

import styles from '../../../styles/GameRoom.module.css'


const MainPanel = () => {
    return (
    <div className="flex flex-col w-full">
        <GamePlayPanel />
        <PlayerPanel />
    </div>
  )
}

export default MainPanel;
