import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Typography, Box} from "@material-ui/core";

const useStyles = makeStyles(() => ({
 
  yellContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'red'
  }

}));

const YellAlert = () => {
  const classes = useStyles();
  return (
    <Box className={classes.yellContainer}>
      <Typography variant='h1'>BULLSHIT!</Typography>
    </Box>
  )
}

export default YellAlert