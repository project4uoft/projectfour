import Nav from './Nav'
import styles from '../styles/Layout.module.css'
import Meta from './Meta'

const Layout = ({children}) => {
    return (
        <>
        <Meta />
        {/* <Nav /> this is throwing of the height measurements - change placement? */}
            <main className ="flex flex-col justify-start flex-initial">
                {children}
            </main>
        </>
    )
}

export default Layout
