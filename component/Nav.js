import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'

const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Link href='/' >
                        <h1>Project 4</h1>
                    </Link>
                </IconButton>
                <Link href='/login' >
                    <Button color="inherit">Login</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
