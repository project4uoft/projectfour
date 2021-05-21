import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0'
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ExitToApp, Face } from "@material-ui/icons";
import profile from "../pages/profile";

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
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

export default function Navbar({ fixed }) {
  const { user } = useUser();
  const router = useRouter();
  const { roomId } = router.query; // Gets roomId from URL
  const classes = useStyles();


  console.log(window.location.href)
  const profileBtn = () => {
    if (window.location.href === "http://localhost:3000/profile"){
      return true
    }
    else{
      return false
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography align="justify">
              <a href="/">
                <Image
                  src={`/assets/images/homepage/Logo1.png`}
                  alt="logo"
                  width={40}
                  height={40}
                  margin={5}
                  href="/"

                />
              </a>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <a href="/">
                Party House
              </a>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Room: <small>{roomId}</small>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Welcome: {user.nickname}
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
