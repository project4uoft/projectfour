import React, { useState } from 'react'

import { createStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'inline-block',
            margin:'5%',
            width: '100px',
            height: '100px',
            backgroundColor: 'black'
        },
    }))

const Ranked = () => {

        const classes = useStyles();

    return (
        <div className={classes.container}>
        </div>
    )
}

export default Ranked
