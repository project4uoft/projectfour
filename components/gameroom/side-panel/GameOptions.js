import gameRoomStyles from "../../../styles/GameRoom.module.css";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  gameList: {
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    whiteSpace: "nowrap",
    marginTop: "10px",
  },
}));

const GameOptions = ({ handleClick }) => {
  const classes = useStyles();
  const animate = {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  };
  return (
    <div className={classes.gameList}>
      <motion.a
        whileHover={animate}
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("bigtwo")}
      >
        Big Two
      </motion.a>

      <motion.a
        whileHover={animate}
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("bullshit")}
      >
        Bullshit
      </motion.a>

      <motion.a
        whileHover={animate}
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("mafia")}
      >
        Mafia
      </motion.a>
      <motion.a
        whileHover={animate}
        className={gameRoomStyles.sidePanelButton}
        onClick={() => handleClick("tictactoe")}
      >
        Tic Tac Toe
      </motion.a>
    </div>
  );
};

export default GameOptions;
