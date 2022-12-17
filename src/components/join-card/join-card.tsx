import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withRouter } from 'react-router';
import { useState } from 'react';
import UserConfigDialog from '../user-config/UserConfigDialog';

const useStyles = makeStyles(theme => {
    return {
        formItems: {
            marginTop: theme.spacing(2)
        }
    }
})

function JoinCard(props: any){
    const classes = useStyles();
    const [state, setState] = useState({room: '', configDialog: false});

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(localStorage.getItem('username') === null || localStorage.getItem('color') === null){
            setState({...state, configDialog: true})
        }
        else
            props.history.push(`/room/${state.room}`);
    }

    const handleInputChange = (event : any) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
    };

    const handleDialogConfigClose = () => {
        setState({...state, configDialog: false})
    }

    const handleDialogConfigSave = () => {
        setState({...state, configDialog: false})
        props.history.push(`/room/${state.room}`);
    }

    return (
        <div>
            <UserConfigDialog
                open={state.configDialog}
                handleClose={handleDialogConfigClose}  
                handleSave={handleDialogConfigSave}/>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Join a room
                    </Typography>
                    <form action="" onSubmit={handleSubmit}>
                        <TextField name="room" id="outlined-basic" label="Code" variant="outlined" size="small" fullWidth className={classes.formItems} onChange={handleInputChange}/>
                        <Button variant="contained" color="primary" fullWidth className={classes.formItems} type="submit">
                            Join
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </div>)
}

export default withRouter(JoinCard);
