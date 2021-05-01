import Head from 'next/head'
import styles from '../styles/Login.module.css'

const login = () => {
    return (
        <div className={styles.container}>
        <Head>
        <title>Login</title>
      </Head>
       <h1>Login</h1>
        </div>
    )
}

export default login


