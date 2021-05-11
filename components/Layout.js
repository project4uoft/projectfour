import styles from '../styles/Layout.module.css'
import Meta from './Meta'

const Layout = ({children}) => {
    return (
        <>
        <Meta />
            <main className ="flex flex-col justify-start flex-initial">
                {children}
            </main>
        </>
    )
}

export default Layout
