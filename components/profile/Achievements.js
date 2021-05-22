import React from 'react'
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) =>
    createStyles({
        rightContainer: {
            height: '85vh',
            display: 'grid',
            justifyContent: 'center'

        },
        container: {
            display: 'inline-block',
            margin: '5% , auto',
            width: '100px',
            height: '100px',
        },
        description: {
            fontSize:25,
            margin: 0
        }
    }))

const Achievements = () => {

    const classes = useStyles();


    return (
        <div className={classes.rightContainer}>
            <div className={classes.container}>
                <Image
                    src={`/assets/images/profile/achievements/medal1.svg`}
                    alt="logo"
                    width={'100%'}
                    height={'100%'}
                    margin={5}
                />
            <p className={classes.description} align = 'center'>Tic-Tac-Toed </p>
            </div>
            <div className={classes.container}>
                <Image
                    src={`/assets/images/profile/achievements/medal2.svg`}
                    alt="logo"
                    width={'100%'}
                    height={'100%'}
                    margin={5}
                />
            <p className={classes.description} align = 'center'>Top 10% Tic Tac Toer </p>

            </div>
            <div className={classes.container}>
                <Image
                    src={`/assets/images/profile/achievements/medal3.svg`}
                    alt="logo"
                    width={'100%'}
                    height={'100%'}
                    margin={5}
                />
            <p className={classes.description} align = 'center'>Weowza </p>

            </div>
        </div>
    )
}

export default Achievements
