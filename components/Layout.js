import Head from 'next/head'
import Header from './header'
import styles from '../styles/Layout.module.css'
import Meta from './Meta'


function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
      <title>Project 4</title>
      </Head>

      <Header user={user} loading={loading} />
      <Meta />
      <div className = {styles.container}>
            <main className = {styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout
