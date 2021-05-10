import React, { useState } from "react";

import Head from 'next/head'
import SidePanel from '../components/gameroom/side-panel/SidePanel'
import MainPanel  from '../components/gameroom/main-panel/MainPanel.js'
// import Nav from '../components/Nav'


//CSS import 
import styles from '../styles/Layout.module.css'


export default function Home() {

  const [currentGame, setCurrentGame] = useState()

  function gameSelection(game) {
    setCurrentGame(game)
  }
  console.log("current game", currentGame)


  return (
    <>
    <div className="flex flex-auto flex-row h-screen">
        <SidePanel  gameSelection={gameSelection}/>
        <MainPanel currentGame={currentGame}/>
    </div>
    </>
  )
}
