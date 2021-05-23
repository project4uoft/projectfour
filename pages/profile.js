import React, { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Profile.module.css'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { connectToDatabase } from "../util/mongodb.js"

import { Typography } from "@material-ui/core";

import Navbar from "../components/Navbar";
import Meta from "../components/Meta";
import UserBox from "../components/profile/UserBox";
import LastPlayed from "../components/profile/LastPlayed";
import Ranked from "../components/profile/Ranked";
import Achievements from "../components/profile/Achievements";



export default withPageAuthRequired(function Profile({ PastGames }) {
    const { user, error, isLoading } = useUser()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (user) {
        const profile = true;

        console.log(PastGames)

        return (
            <>
                <Meta title="Game Room" />

                <Navbar profile={profile} />

                <div className={styles.cardContainer}>

                    <UserBox user={user} />

                    <div className={styles.middleContainer}>
                        <div>
                            <h3 className={styles.title}>Last Games Played</h3>
                            <div className={styles.gamesContainer}>
                                {PastGames.map((PastGame) => {
                                    return (
                                        <>
                                            <LastPlayed
                                                created_at={PastGame.created_at}
                                                outcome={PastGame.outcome}
                                                game={PastGame.game}

                                            />
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                        <div>
                            <h3 className={styles.ranked}>Ranked </h3>
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


// Fetch Game History
export async function getServerSideProps(context) {
    const { db } = await connectToDatabase()

    const data = await db.collection("P4User").find({ "postedBy": 'bob@gmail.com' }).toArray();

    const history = JSON.parse(JSON.stringify(data))

    const { PastGames } = history[0];

    console.log(PastGames)

    // console.log(_id, postedBy, created_at, outcome, game)

    return {
        props: {
            PastGames: PastGames
        }
    }

}

