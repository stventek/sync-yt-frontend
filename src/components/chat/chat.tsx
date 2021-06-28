import { makeStyles, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import Messages from "./messages";
import SendIcon from '@material-ui/icons/Send';
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
    chatControls: {
        padding: theme.spacing(0, 2),
        paddingBottom: theme.spacing(2)
    },
    typeMessage: {
        [`& fieldset`]: {
            borderRadius: 0,
        },
    },
    chat: {
        /*
        height: 'calc(((100vw - 472px) * 0.5625) + 85px)',
        maxHeight: 'calc(((1700px - 472px) * 0.5625) + 85px)',
        */
        height: '775px',
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100% - 56.25vw - 85px)',
            width: 'unset',
            flexGrow: 1,
            margin: 0
        }
    }
}));

export default function Chat(props: {room: string}){
    const classes = useStyles();
    const [state, setState] = useState({message: ""})

    const handleInputChange = (event : any) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
    };

    return (
        <Paper square className={classes.chat} variant="outlined">
            <Hidden smDown>
                <Typography align="center" variant="h6">
                    <Box lineHeight={2.5}>CHAT</Box>
                </Typography>
                <Divider />
            </Hidden>
            <Messages room={props.room}/>
            <div className={classes.chatControls}>
                <TextField name="message" variant="outlined" onChange={handleInputChange} className={classes.typeMessage} placeholder="Send a message" multiline rowsMax={4} fullWidth/>
                <Box textAlign="right" marginTop={1}>
                    <IconButton color="primary">
                        <SendIcon/>
                    </IconButton>
                </Box>
            </div>
        </Paper>
    )
}
