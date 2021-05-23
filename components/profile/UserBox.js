import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Face } from "@material-ui/icons";


const useStyles = makeStyles({
    root: {
        zIndex: '3',
        height: '75vh',
        maxWidth: '300px',
        color:'white',
        backgroundColor: '#3f51b5',
        overflow: 'visible',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    container: {
        display: 'grid',
        gridTemplateRows: '0.5fr 3fr 2fr',
        height: '85vh',
        gridGap: '0%'

    },
    title: {
        height: 50,
        fontSize: 14,
        marginBottom: 0,
    },
    userImageBox: {
        // height: '70%',
    },
    userImgIcon: {
        height: "75%",
        zIndex:"1",
        border: '3px solid #3f51b5',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '30%',
        marginLeft: '30%'
    },
    uploadImgBtn: {
        float: 'right'
    },
    userInfo: {
        backgroundColor:'none',
        fontSize: '1.2em'
    }
});

export default function UserBox({ user }) {

    const classes = useStyles();

    return (
        // <img src={user.picture} alt={user.name} />
        // <h2>{user.name}</h2>
        <Card className={classes.root} variant="outlined">

            <CardContent className={classes.container}>

                <Typography variant="h4" component="h4">
                    {user.nickname}
                </Typography>

                <div className={classes.userImgBox}>
                    <img className={classes.userImgIcon} src={user.picture} alt={user.name} />
                    <Button className={classes.uploadImgBtn} variant="contained" color="primary">Upload Image <Face /></Button>
                </div>
                <div >
                    <Typography className = {classes.userInfo}>
                        Name: {user.nickname}
                    </Typography>
                    <Typography className = {classes.userInfo}>
                        Email: {user.email}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

