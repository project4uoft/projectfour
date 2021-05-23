import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ExitToApp, Face } from "@material-ui/icons";



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: 10,
    },
  })
);

export default function Navbar({ fixed }) {
  const router = useRouter();
  const { roomId, playerName } = router.query; // Gets roomId from URL
  const classes = useStyles();

  const profileBtn = () => {
    if (router.pathname === "/profile") {
      return true
    }
    else {
      return false
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography align="justify">
              <a href="/">
                <Image
                  src={`/assets/images/homepage/Logo1.png`}
                  alt="logo"
                  width={40}
                  height={40}
                  margin={5}
                  href="/welcome"
                />
              </a>
            </Typography>
            <Typography variant="h6" className={classes.title}>
            <a href="/">
              Party House
              </a>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/profile"
              disabled={profileBtn()}
              className={classes.button}
              endIcon={<Face />}
              style={{ marginRight: "3em" }}
            >
              Profile
        </Button>
            <Button
              variant="contained"
              color="primary"
              href="/api/auth/logout"
              className={classes.button}
              endIcon={<ExitToApp />}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
