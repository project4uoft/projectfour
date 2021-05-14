import React, { useState } from 'react'
import { motion } from "framer-motion";
import Box from "@material-ui/core/Box";

const Variants = {
    showCard: {
        rotateY: 0,
        transition: { duration: 1.5 }
    },
    hideCard: {
        rotateY: 180,
        transition: { duration: 1.5 }
    },
    frontCard: {
        backgroundColor: "red",
        height: 200,
        width: 200,
        borderRadius: 25,
        position: "absolute",
        padding: 20,
        WebkitBackfaceVisibility: "hidden",
        BackfaceVisibility: "hidden",
        rotateY: 0
    },
    backCard: {
        background: "#19D2A7",
        height: 200,
        width: 200,
        borderRadius: 25,
        // position: "absolute",
        padding: 20,
        WebkitBackfaceVisibility: "hidden",
        BackfaceVisibility: "hidden",
        rotateY: 180
    }
}

function WelcomeCard() {

    const [isHovered, setIsHovered] = useState(false);

    const HandleFlip = () => {
        setIsHovered(!isHovered);
    }

    const Front = (
        <motion.div
            variants={Variants}
            initial={"frontCard"}
            animate={isHovered ? "hideCard" : "showCard"}
        >
           FRONT
        </motion.div>
    )

    const Back = (
        <motion.div
            variants={Variants}
            initial={"backCard"}
            animate={isHovered ? "showCard" : "hideCard"}
        >Back</motion.div>
    )
    return (
        <Box
            onMouseEnter={HandleFlip}
            onMouseLeave={HandleFlip}
        >
            {Front}
            {Back}

        </Box>

    )
}

export default WelcomeCard
