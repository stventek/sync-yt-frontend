import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import socket from "../../utilities/socket";
import { parseTextWithEmojis } from "../../utilities/parseTextWithEmojis";
import {EmojiStyle } from "emoji-picker-react";

const useStyles = makeStyles(theme => ({
    container: {
        wordWrap: 'break-word',
        flexGrow: 1,
        overflowY: 'auto',
        padding: theme.spacing(1,2)
    }
}));

type message = {message: string, author: string, color: string};

const Messages = React.memo((props : {room: string, scrollId: string}) => {
    const classes = useStyles();
    const [messages, setMessages] = useState<message[]>([]);
    const scrollRef = useRef<any>(null);

    useEffect(() => {
        if(scrollRef)
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('message-recive', (message: message) => {
            if(messages.length > 49){
                const newMessages = [...messages];
                newMessages.push(message)
                newMessages.shift();
                return setMessages(newMessages);
            }
            setMessages(messages => [...messages, message]);
        });

        socket.on('join-chat', (messages: message[]) => {
            setMessages(messages);
        })
        return () => {
            socket.off('message-recive');
        }
    });

    return (
        <div className={classes.container}>
            {messages.map((message, index) => {
                return (
                    <div key={index}>
                        <Typography variant="body1" component="span">
                            {message.author === 'server' ? null:
                            <Box fontWeight={700} color={message.color} component="span">{message.author}: </Box>}
                        </Typography>
                        <Typography 
                            style={{verticalAlign: 'middle'}}
                            variant="body1" 
                            component="span">
                                {parseTextWithEmojis(message.message)}</Typography>
                    </div>
                )
            })}
            <div ref={scrollRef} id={props.scrollId}/>
        </div>
    )
})

export default Messages;
