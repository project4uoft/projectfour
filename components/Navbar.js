import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { useUser } from "@auth0/nextjs-auth0";

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
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography align="justify">
              <Image
                src={`/assets/images/homepage/Logo1.png`}
                alt="logo"
                width={40}
                height={40}
                margin={5}
              />
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Party House
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
