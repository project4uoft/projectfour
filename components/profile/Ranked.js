import React, { useState } from 'react'
import Image from "next/image";


import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { Block } from '@material-ui/icons';


const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'inline-block',
            margin: '5%',
            width: '200px',
            height: '200px',
            border: '3px solid #3f51b5',
            boxShadow: 'white 0px 3px 5px',
            borderRadius: '100%',
            fontSize: '30px',
            backgroundColor: 'black'
        },
    }))

const Ranked = () => {
    const game = "tic-tac-toe"
    const rank = "20th"
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Image
                src={`/assets/images/profile/TicTacToe.png`}
                alt="logo"
                width={'100%'}
                height={'100%'}
                margin={5}
            />
            <Typography align = 'center'>{game} <p>{rank}</p>
            </Typography>
            
        </div>
    )
}

export default Ranked
