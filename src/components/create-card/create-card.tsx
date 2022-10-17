import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import socket from '../../utilities/socket';
import {withRouter} from 'react-router-dom';
import { useState } from 'react';
import UserConfigDialog from '../user-config/UserConfigDialog';

const useStyles = makeStyles(theme => {
    return {
        formItems: {
            marginTop: theme.spacing(2)
        }
    }
});

function CreateCard(props: any){
    const classes = useStyles();
    const [state, setState] = useState({ configDialog: false});

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(localStorage.getItem('username') === null){
            setState({...state, configDialog: true})
        }
        else
            socket.emit('create-room', (room: number) => {
                props.history.push(`/room/${room}`);
            })
    }

    const handleDialogConfigClose = () => {
        setState({...state, configDialog: false})
    }

    const handleDialogConfigSave = (username: string) => {
        localStorage.setItem('username', username)
        setState({...state, configDialog: false})
        socket.emit('create-room', (room: number) => {
            props.history.push(`/room/${room}`);
        })
    }

    return (
        <div>
            <UserConfigDialog handleClose={handleDialogConfigClose}  handleSave={handleDialogConfigSave} open={state.configDialog}/>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Create a room
                    </Typography>
                    <form action="" onSubmit={handleSubmit}>
                        <Button variant="contained" color="primary" fullWidth className={classes.formItems} type="submit">
                            Create
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>)
}

export default withRouter(CreateCard);
