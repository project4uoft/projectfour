import Head from "next/head";
import Navbar from '../components/navbar/navbar';
import Card from "../components/WelcomeCard";
import { Box, Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import data from "../games.json";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

// import { makeStyles } from '@material-ui/styles'

// const useStyles = makeStyles(theme => ({
//     root: { display: "flex", justifyContent: "center" }
// }))

export default function Welcome() {

    // const classes = useStyles()
    const { user } = useUser();
    const router = useRouter();

    const [roomID, setRoomID] = useState("")

    let games = data.map(game => {
        return (
            <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        key={game.id}
                        name={game.name}
                        image={game.image}
                        description={game.description}
                    />
                </Box>

            </Grid>)
    })

    const onChange = (e) => {
        setRoomID(e.target.value)
    }

    const onClickJoin = (e) => {
        router.push(`/rooms/${roomID}`);
    }



    return (
        <>
            <Head>
                <title>Welcome</title>
            </Head>
            <Navbar />

            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* Column1 - Form */}
                    <Grid item xs={12}>
                        <Box style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                            <TextField
                                label="Enter Room ID"
                                variant="filled"
                                fullWidth={true}
                                color="secondary"
                                value={roomID}
                                onChange={(e) => (onChange(e))} />
                            <Button color="secondary" variant="contained" fullWidth={true} onClick={onClickJoin}>Join</Button>
                        </Box>
                    </Grid>
                    {games}
                </Grid>
            </Container>
        </>
    );
}
