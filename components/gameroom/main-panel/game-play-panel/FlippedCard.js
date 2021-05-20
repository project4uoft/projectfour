import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import { motion } from "framer-motion";


const useStyles = makeStyles(() => ({
  flippedCard: {
    width: '50px',
    height: '70px',
    backgroundColor: 'purple',
    color: 'white',
    lineHeight: '70px',
    fontSize:'20px',    
    borderRadius: '10px',
    marginRight: '10px',
    marginBottom: '10px',
  },
}));


const FlippedCard = ({text}) => {
  const classes = useStyles();
  return (
    // <Paper className={classes.flippedCard}>
    //   {text}
    // </Paper>
    <motion.div
    whileHover={{ scale: 1.2 }}
    className={classes.flippedCard}
  >
    {text}
  </motion.div>
  );
};

export default FlippedCard;
