import JoinCard from '../../components/join-card/join-card';
import CreateCard from '../../components/create-card/create-card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/navbar/navbar';
import Box from '@material-ui/core/Box';
import Copyright from '../../components/copyright/Copyright';

const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4)
        }
    }
});

export default function Home(){

    const classes = useStyles();

    return (
        <div>
            <NavBar withChangeVideoInput={false} useConfigDialog={true}/>
            <Typography align="center" variant="h4" className={classes.root} component="h1">Watch videos together</Typography>
            <Container maxWidth="xs">
                <Grid container direction="column" spacing={2} justify="center">
                    <Grid item xs={12}><JoinCard/></Grid>
                    <Grid item xs={12}><CreateCard/></Grid>
                </Grid>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </div>
    )
}
