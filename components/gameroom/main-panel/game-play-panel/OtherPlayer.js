import React from "react";
import FlippedCard from './FlippedCard'
import {Typography, Box, Button, Grid, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  playContainer: {
    width: '150px',
    height: '150px',
    fontSize:'24px',
  },
}));

const OtherPlayer = ({players}) => {
  
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
    >
      {players.map((p, i) => (
          <Grid item key={`other-player-${i}`}>
            <Paper className={classes.playContainer}>
              {p.playerName}
              <Box 
                display="flex"
                justifyContent="center"
                marginTop="10px"
              >
                <FlippedCard text={p.playerCards.length}/>
              </Box>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default OtherPlayer;
