import { Checkbox, makeStyles, Paper, Switch } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState, memo, useCallback, useEffect, ChangeEvent } from "react";
import Messages from "./messages";
import SendIcon from '@material-ui/icons/Send';
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import socket from "../../utilities/socket";
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import { PickerConfig } from "emoji-picker-react/dist/config/config";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InputAdornment from '@material-ui/core/InputAdornment';

const EmojiPickerMemo = memo((props: PickerConfig) => {
    return <EmojiPicker {...props} previewConfig={{showPreview: false}}/>
})

const useStyles = makeStyles(theme => ({
    iconCheckbox: {
        '&$checked': {
            color: '#fcc83f'
        },
    },
    checked: {},
    '@global': {
        '.EmojiPickerReact': {
            '--epr-emoji-size': '25px',
        },
        '.EmojiPickerReact.epr-dark-theme': {
            '--epr-emoji-size': '25px',
            '--epr-bg-color': theme.palette.background.paper,
            '--epr-category-label-bg-color': theme.palette.background.paper
        },
        'aside.EmojiPickerReact.epr-main': {
            borderColor: theme.palette.background.paper
        }
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
        height: '620px',
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
    const [state, setState] = useState({message: "", sendDisabled: true, emojiChecked: false})
    const [emojiChecked, setEmojiChecked] = useState(false)
    const scrollId = 'messageScrollId'
    const mode = localStorage.getItem('mode') === 'light' ? Theme.LIGHT : Theme.DARK

    const handleInputChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const message = e.target.value as string;
        if(message[0] === '\n' || message[0] === ' '){
            e.preventDefault();
            return;
        }
        if(message.substr(-1) === '\n'){
            e.preventDefault();
            socket.emit('message', props.room, state.message);
            setState({...state, message: "", sendDisabled: true});  
            return;
        }
        else{
            if(message === ''){
                return setState({...state, message, sendDisabled: true});  
            }
            setState({...state, sendDisabled: false, message});
        }
    };

    useEffect(() => {
        if(emojiChecked) document.getElementById(scrollId)?.scrollIntoView({ behavior: 'smooth' })
    }, [emojiChecked])

    const sendMessage = (e: any) => {
        setState({...state, message: "", sendDisabled: true});
        socket.emit('message', props.room, state.message);
    }

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmojiChecked(!emojiChecked)
    }

    const handleEmojiPick = useCallback((e: EmojiClickData) => {
        setState((s) => {
            return {...s, message: s.message + e.emoji, sendDisabled: false}
        })
    }, [])

    return (
        <Paper square className={classes.chat} variant="outlined">
            <Hidden smDown>
                <Typography align="center" variant="h6">
                    <Box lineHeight={2.5}>CHAT</Box>
                </Typography>
                <Divider />
            </Hidden>
            <Messages scrollId={scrollId} room={props.room}/>
            <Box paddingLeft={1} paddingRight={1} paddingBottom={1}>
                <TextField 
                    name="message" 
                    value={state.message} 
                    variant="outlined" 
                    onChange={handleInputChange} 
                    className={classes.typeMessage} 
                    placeholder="Send a message" 
                    multiline maxRows={4} 
                    InputProps={{endAdornment: (<InputAdornment position="end">
                        <Checkbox onChange={handleChecked} checked={emojiChecked} color="default" classes={{root: classes.iconCheckbox, checked: classes.checked}} icon={<EmojiEmotionsIcon/>} checkedIcon={<EmojiEmotionsIcon/>}/>
                        </InputAdornment>)}}
                    fullWidth/>
            </Box>
            <Box hidden={!emojiChecked} paddingLeft={1} 
                paddingRight={1} 
                paddingBottom={1}>
                    <EmojiPickerMemo
                        theme={ mode }
                        onEmojiClick={handleEmojiPick}	
                        emojiStyle={EmojiStyle.GOOGLE} 
                        height={255} 
                        width="100%"/>
            </Box>
            <Hidden smDown>
                    <Box textAlign="right" paddingBottom={1}>
                        <IconButton color="primary" onClick={sendMessage} disabled={state.sendDisabled}>
                            <SendIcon/>
                        </IconButton>
                    </Box>
            </Hidden>
        </Paper>
    )
}
