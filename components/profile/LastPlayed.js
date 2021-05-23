import React from 'react';
import StarsIcon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';
import Image from "next/image";
import Typography from '@material-ui/core/Typography';


// import TicTacToe from './assets/Mafia.png'

const useStyles = makeStyles({
    root: {
        width: '100%',
        justifyContent: 'center'
    },
    box: {
        height: '110%',
        zIndex: '1',
        // maxWidth: '70%',
        display: 'grid',
        margin: 'auto',
        color: 'white',
        borderRadius: '30% 0',
        textAlign: 'center',
    },
    info: {
        height: '100%',
        color: 'white',
        textAlign: 'center',
        padding:'1%'
    },
    scoreBox: {
        height: '80%',
        width: '80%',
        marginLeft: '5%',
        padding:'5%',
        border: '3px solid #3f51b5',
        boxShadow: 'black 0px 3px 5px',
        borderRadius: '30%',
        fontSize: '30px',
        marginRight: '5%',
    },
    title: {
        backgroundColor: 'none',
        fontSize: '1.5em',
        marginTop: 6,
        marginBottom: 4

    },
    spanScore: {
        fontSize: '30px',
    }
});


function LastPlayed({ created_at, outcome, game }) {

    const classes = useStyles();
    game="Bullshit"

    const gameIcon = (x) => {
        switch (x) {
            case 'Tic-Tac-Toe':
                return <Image
                    src={`/assets/images/profile/TicTacToe.png`}
                    alt="logo"
                    width={'100%'}
                    height={'100%'}
                    margin={5}
                />
            case 'Mafia':
                return <Image
                src={`/assets/images/profile/Mafia.png`}
                alt="logo"
                width={'100%'}
                height={'100%'}
                margin={5}
            />
            case 'Big Two':
                return <Image
                src={`/assets/images/profile/BigTwo.png`}
                alt="logo"
                width={'100%'}
                height={'100%'}
                margin={5}
            />
            case 'Bullshit':
                return <Image
                src={`/assets/images/profile/Bullshit.png`}
                alt="logo"
                width={'100%'}
                height={'100%'}
                margin={5}
            />
                break;
        }
    }



    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <div>
                    <h3 className={classes.title}>Last Game Played</h3>
                </div>
                <div className={classes.info}>
                    <div className={classes.scoreBox}>
                        { gameIcon(game) }
                        <Typography >
                            {game}
                        </Typography>
                        <p className={classes.spanScore}>{outcome}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastPlayed;
