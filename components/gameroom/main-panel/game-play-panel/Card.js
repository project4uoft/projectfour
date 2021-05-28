import React from "react";
import { motion } from "framer-motion";
import {Typography, Box, Button, Grid, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const suitIcon = {
  diamonds: "♦",
  clubs: "♣",
  hearts: "♥",
  spades: "♠",
};

const useStyles = makeStyles(() => ({
  card:{
    width: '50px',
    height: '70px',
    padding: '5px',
    marginRight: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    backgroundColor: 'white'
    },

  red: {
    color: 'red'
  },

  black: {
    color: 'black'
  },

  checked:{
    border: '3px solid red',
  },
  unchecked:{
    border: '1px solid gray',
  }

}));

//color: suit => (suit==='diamonds' || suit==='hearts') ? 'red' : 'black'
  
const Card = ({ suit, rank, checked }) => {
  const classes = useStyles(suit);
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className={`${classes.card} ${(suit==='diamonds' || suit==='hearts') ? classes.red : classes.black} ${(checked) ? classes.checked : classes.unchecked}`}
    >
      {rank}
      {suitIcon[suit]}
    </motion.div>
  );
};

export default Card;
