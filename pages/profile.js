import React, { useState } from "react";
import Head from 'next/head'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import Meta from "../components/Meta";
import UserBox from "../components/profile/UserBox";
import LastPlayed from "../components/profile/LastPlayed";
import Ranked from "../components/profile/Ranked";
import Achievements from "../components/profile/Achievements";


const useStyles = makeStyles((theme) =>
    createStyles({

        cardContainer: {
            position: 'relative',
            width: '90vw',
            height: '95vh',
            top: '10vh',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '2fr 3fr 1fr',
            gridGap: '20px',
            padding: '25px',

        },
        middleContainer: {
            height: '85vh',
            display: 'grid',
            gridTemplateRows: "1fr 1fr",
        },
    }))

export default withPageAuthRequired(function Profile() {
    const { user, error, isLoading } = useUser()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (user) {

        const classes = useStyles();

        const profile = true;


        return (
            <>
                <Meta title="Game Room" />
                <Navbar profile={profile} />
                <div className={classes.cardContainer}>
                    <UserBox user={user} />
                    <div className={classes.middleContainer}>
                        <LastPlayed 
                            score={"4/7"}
                            game={'Tic-Tac-Toe'}
                        />
                        <div>
                            <Ranked />
                            <Ranked />
                        </div>
                    </div>
                    <Achievements />
                </div>
            </>
        )
    }
});
