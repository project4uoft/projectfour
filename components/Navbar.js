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
    user: {
      flexGrow: 1,
      marginLeft: 10,
    }
  })
);

export default function Navbar({ fixed }) {
  const router = useRouter();
  const { user, error, isLoading } = useUser()
  const { roomId, playerName } = router.query; // Gets roomId from URL
  const classes = useStyles();

  console.log(user)

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
            <Typography variant="h6" className={classes.user}>
              Welcome {user.nickname}
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

      {/* <nav>
        <div>
          <Image
            src={`/assets/images/homepage/Logo1.png`}
            alt="logo"
            width={40}
            height={40}
          />
          <div>
            <a href="#">
              Party House Game Room: <span>{roomId}</span>
            </a>
            <button type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <span>Welcome: {playerName}</span>
          <ul>
            <li>
              <a href="/api/auth/logout">
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
    </>
  );
}
