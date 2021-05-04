import Head from 'next/head'
import SidePanel from '../components/gameroom/side-panel/SidePanel'
import PlayerPanel from '../components/gameroom/player-panel/PlayerPanel'
import GamePlayPanel  from '../components/gameroom/game-play-panel/GamePlayPanel.js'
// import GamePlay from '../components/gameroom/GamePlay'
// import ActivePlayers from '../components/gameroom/ActivePlayers'

import styles from '../styles/Layout.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
        <SidePanel />
        <GamePlayPanel />
        <PlayerPanel />
    </div>
  )
}
