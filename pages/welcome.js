import Head from "next/head";
import Navbar from '../components/navbar/navbar';
import Card from "../components/WelcomeCard";
import { Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function Welcome() {

    return (

        <>
            <Head>
                <title>Welcome</title>
            </Head>
            <Navbar />

            <Container maxWidth="lg">
                <Grid container spacing={4}
                >
                    {/* Column1 - Form */}
                    <Grid item xs={12} spacing={4}>
                        <form noValidate autoComplete="off" spacing={2}>
                            <TextField id="filled-basic" label="Enter Room ID" variant="filled" fullWidth={true} />
                            <Button color="secondary" variant="outlined" fullWidth={true}>Join</Button>
                        </form>
                    </Grid>
                    {/* Column3 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>
                    {/* Column3 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>
                    {/* Column4 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>
                    {/* Column5 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>
                    {/* Column6 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>
                    {/* Column7 */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Card />
                    </Grid>

                </Grid>
            </Container>



        </>

    );
}
