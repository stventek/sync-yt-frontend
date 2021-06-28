import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: theme.spacing(1),
        wordWrap: 'break-word',
        flexGrow: 1,
        overflowY: 'auto',
        padding: theme.spacing(0,2)
    }
}));

type state = {messages: {message: string, author: string}[]};

const Messages = React.memo((props : {room: string}) => {
    const classes = useStyles();
    const [state, seState] = useState<state>({messages: []});

    return (
        <div className={classes.container}>
            {state.messages.map((message, index) => {
                return (
                    <div key={index}>
                        <Typography variant="body1" component="span" color="primary">
                            <Box fontWeight={700} component="span">{message.author}: </Box>
                        </Typography>
                        <Typography variant="body1" component="span">{message.message}</Typography>
                    </div>
                )
            })}
        </div>
    )
})

export default Messages;
