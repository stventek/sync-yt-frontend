import { makeStyles, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    chat: {
        height: 'calc(100% - 56.25vw - 70px)'
    }
}));

export default function Chat(){
    const classes = useStyles();
    const [state, setState] = useState({message: ""})

    const handleInputChange = (event : any) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
    };

    return (
        <Paper className={classes.chat}>
        </Paper>
    )
}
