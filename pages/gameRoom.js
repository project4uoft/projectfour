import Head from 'next/head'
import SidePanel from '../components/gameroom/side-panel/SidePanel'
// import PlayerPanel from '../components/gameroom/main-panel/player-panel/PlayerPanel'
// import GamePlayPanel  from '../components/gameroom/main-panel/game-play-panel/GamePlayPanel.js'
import MainPanel  from '../components/gameroom/main-panel/MainPanel.js'
// import GamePlay from '../components/gameroom/GamePlay'
// import ActivePlayers from '../components/gameroom/ActivePlayers'

import styles from '../styles/Layout.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
        <SidePanel />
        <MainPanel />
        {/* <GamePlayPanel /> */}
        {/* <PlayerPanel /> */}
    </div>
  )
}
