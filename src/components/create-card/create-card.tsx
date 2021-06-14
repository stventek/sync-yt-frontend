import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => {
    return {
        formItems: {
            marginTop: theme.spacing(2)
        }
    }
});

export default function CreateCard(){
    const classes = useStyles();
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Create a room
                    </Typography>
                    <form action="">
                        <Button variant="contained" color="primary" fullWidth className={classes.formItems} type="submit">
                            Create
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>)
}
