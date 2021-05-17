import React from 'react'
import { createStyles, makeStyles } from "@material-ui/core/styles";

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
            backgroundColor: 'black',
        },
    }))

const Achievements = () => {

    const classes = useStyles();


    return (
        <div className={classes.rightContainer}>
            <div className={classes.container}>
            </div>
            <div className={classes.container}>
            </div>
            <div className={classes.container}>
            </div>
        </div>
    )
}

export default Achievements
