import gameRoomStyles from "../../../styles/GameRoom.module.css";
import { Drawer, Toolbar } from "@material-ui/core/";
import GameOptions from "./GameOptions";
import Chatroom from "./Chatroom";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 280;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#3A4D85",
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const SidePanel = ({ handleClick, gameBoard }) => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        variant="permanent"
        color="primary"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        {/* <GameOptions handleClick={handleClick} gameBoard={gameBoard} /> */}
        <Chatroom gameBoard={gameBoard} />
      </Drawer>
    </>
  );
};

export default SidePanel;
