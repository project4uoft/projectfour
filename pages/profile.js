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



export default withPageAuthRequired(function Profile({ _id,
    postedBy, 
    created_at, 
    outcome, 
    game
 }) {
    const { user, error, isLoading } = useUser()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (user) {

        const profile = true;

        return (
            <>
                <Meta title="Game Room" />

                <Navbar profile={profile} />

                <div className={styles.cardContainer}>

                    <UserBox user={user} />

                    <div className={styles.middleContainer}>

                        <LastPlayed
                            created_at = {created_at}
                            outcome = {outcome}
                            game = {game}
   
                        />

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

    const data = await db.collection("P4User").find({"postedBy":'bob@gmail.com'}).toArray();

    const history = JSON.parse(JSON.stringify(data))
    const {_id, postedBy, created_at, outcome, game} = history[0];

    console.log(_id, postedBy, created_at, outcome, game)

    return {
        props: {
            _id,
            postedBy, 
            created_at, 
            outcome, 
            game
        }
    }

}

