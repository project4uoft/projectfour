import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project 4</title>
      </Head>
      <h1>
        Project 4 Home Page
      </h1>
      <button onClick = {() => window.location.replace("/login") }>Login</button>
    </div>
  )
}
