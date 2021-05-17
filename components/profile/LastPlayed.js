import React from 'react';
import StarsIcon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';
import Image from "next/image";
import Typography from '@material-ui/core/Typography';


// import TicTacToe from './assets/Mafia.png'

const useStyles = makeStyles({
    root: {
        height: '70%',
        zIndex: '1',
        maxWidth: '80%',
        display: 'grid',
        gridTemplateRows: '1fr 3fr',
        color: 'white',
        backgroundColor: '#3f51b5',
        border: '3px solid #3f51b5',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '30%',
        textAlign: 'center'
    },
    info: {
        height: '90%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        color: 'white',
        textAlign: 'center'
    },
    scoreBox: {
        width: '70%',
        marginLeft: '20%',
        border: '3px solid #3f51b5',
        boxShadow: 'white 0px 5px 15px',
        borderRadius: '30%',
        fontSize: '30px',
        marginRight: '10%',
    },
    title: {
        backgroundColor: 'none',
        fontSize: '1.2em'
    },
    spanScore:{
        fontSize:'25px',
        paddingBottom: '10%',

    }
});


function LastPlayed({ game, score, title }) {

    const classes = useStyles();



    const gameIcon = (x) => {
        switch (x) {
            case 'Tic-Tac-Toe':
                return <img src={TicTacToe}></img>
                break;
        }
    }

    return (
        <div className={classes.root}>
            <div>
                <h3 className={classes.title}>Last Game Played</h3>
            </div>
            <div className={classes.info}>
                <div className={classes.scoreBox}>
                    <Image
                        src={`/assets/images/profile/TicTacToe.png`}
                        alt="logo"
                        width={'100%'}
                        height={'100%'}
                        margin={5}
                    />
                    <Typography >
                        {game}
                    </Typography>
                </div>
                <div className={classes.scoreBox}>
                    <p>{score}</p>
                    <span className = {classes.spanScore}>
                        {(parseInt(score) > 0.5) ? `You Won!` : `You Lost!`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LastPlayed;
