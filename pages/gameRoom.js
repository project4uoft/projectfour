import Head from 'next/head'
import SidePanel from '../components/gameroom/side-panel/SidePanel'
import MainPanel  from '../components/gameroom/main-panel/MainPanel.js'
// import Nav from '../components/Nav'

//CSS import 
import styles from '../styles/Layout.module.css'


export default function Home() {
  return (
    <>
    <div className="flex flex-auto flex-row h-screen">
        <SidePanel />
        <MainPanel />
    </div>
    </>
  )
}
