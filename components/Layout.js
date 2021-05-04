import Head from 'next/head'
import Header from './header'
import styles from '../styles/Layout.module.css'


function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
      <title>Project 4</title>
      </Head>

      <Header user={user} loading={loading} />
      <div className = {styles.container}>
            <main className = {styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout
