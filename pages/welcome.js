import Head from "next/head";
import Navbar from "../components/navbar/navbar";
import Card from "../components/WelcomeCard";
import { Box, Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import data from "../games.json";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";

export default function Welcome() {
  // const classes = useStyles()
  const { user } = useUser();
  const router = useRouter();

  const [roomID, setRoomID] = useState("");

  const handleGameJoin = (game) => {
    const roomId = nanoid(6);
    router.push(`/rooms/${roomId}?game=${game}`);
  };

  let games = data.map((game) => {
    return (
      <Grid item xs={12} sm={6} md={3} lg={3} key={game.id}>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Card
            key={game.id}
            name={game.name}
            image={game.image}
            description={game.description}
            handleGameJoin={() => handleGameJoin(game.name)}
          />
        </Box>
      </Grid>
    );
  });

  const onChange = (e) => {
    setRoomID(e.target.value);
  };

  const onClickJoin = () => {
    if (roomID) router.push(`/rooms/${roomID}?game=""`);
  };

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <Navbar />

<<<<<<< HEAD
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* Column1 - Form */}
                    <Grid item xs={12}>
                        <Box style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", marginTop: '50px', marginBottom: '50px' }}>
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
=======
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Column1 - Form */}
          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Enter Room ID"
                variant="filled"
                fullWidth={true}
                color="secondary"
                value={roomID}
                onChange={(e) => onChange(e)}
              />
              <Button
                color="secondary"
                variant="contained"
                fullWidth={true}
                onClick={onClickJoin}
              >
                Join
              </Button>
            </Box>
          </Grid>
          {games}
        </Grid>
      </Container>
    </>
  );
>>>>>>> 4aff99a... Style main game room, redirect to game after welcome page
}
