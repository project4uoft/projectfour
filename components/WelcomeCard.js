import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Grid, Button, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "../styles/WelcomeCard.module.css";

const Variants = {
  showCard: {
    rotateY: 0,
    transition: { duration: 1.5 },
  },
  hideCard: {
    rotateY: 180,
    transition: { duration: 1.5 },
  },
  frontCard: {
    backgroundColor: "white",
    height: 450,
    width: 300,
    borderRadius: 37,
    position: "absolute",
    WebkitBackfaceVisibility: "hidden",
    BackfaceVisibility: "hidden",
    rotateY: 0,
  },
  backCard: {
    background: "white",
    height: 450,
    width: 300,
    borderRadius: 37,
    WebkitBackfaceVisibility: "hidden",
    BackfaceVisibility: "hidden",
    rotateY: 180,
  },
};

function WelcomeCard({ name, image, description, handleGameJoin }) {
  const { user } = useUser();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  const HandleFlip = () => {
    setIsHovered(!isHovered);
  };

  const Front = (
    <motion.div
      variants={Variants}
      initial={"frontCard"}
      animate={isHovered ? "hideCard" : "showCard"}
    >
      <Image src={image} alt="logo" width={300} height={450}></Image>
    </motion.div>
  );

  const Back = (
    <motion.div
      variants={Variants}
      initial={"backCard"}
      animate={isHovered ? "showCard" : "hideCard"}
    >
      <div style={{ padding: 15, overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              {name}
            </Typography>
            <hr></hr>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                height: 280,
                textAlign: "justify",
                overflowY: "hidden",
              }}
            >
              <Typography color="textSecondary">{description}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGameJoin}
            >
              Play in Private Room
            </Button>
          </Grid>
        </Grid>
      </div>
    </motion.div>
  );

  return (
    <div onMouseEnter={HandleFlip} onMouseLeave={HandleFlip}>
      {Front}
      {Back}
    </div>
  );
}

export default WelcomeCard;
