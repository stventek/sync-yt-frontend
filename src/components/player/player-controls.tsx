import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import socket from '../../utilities/socket';
import { useState } from 'react';
import { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import msToTime from '../../utilities/ms-to-time';

function ValueLabelComponent(props: any) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

type controlsProps = {
    end: number,
    player: any,
    room: string,
    pause: boolean,
    startUnix: number
}

const useStyles = makeStyles(theme => ({
    controllsContainer: {
        height: 85,
        padding: theme.spacing(1),
    },
    playButton: {
        padding: theme.spacing(1),
    },
    vidBar: {
        padding: theme.spacing(1, 0)
    }
}));


export default function PlayerControls(props: controlsProps){

    const [state, setState] = useState({time: 0, timeDisplay: "00"});
    const classes = useStyles();

    //takes player current time and sync it with the slider
    useEffect(() => {
        const interval = setInterval(() => {
            if(props.startUnix > 0 && !props.pause){
                const millisec = (Date.now() - props.startUnix)
                setState({...state, time: millisec, timeDisplay: msToTime(millisec)})
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    },[props])

    const handleToggle = (e: any) => {
        if(props.pause)
            socket.emit('resume', props.room);
        else
            socket.emit('pause', props.room);
    };

    const handleSeekTo = (e: any, value: number | number[]) => {
        socket.emit('seekTo', props.room, value);
    }

    return (
        <div>
            <Paper variant="outlined" square className={classes.controllsContainer}>
                <Slider className={classes.vidBar} value={state.time} onChangeCommitted={handleSeekTo} color="secondary" ValueLabelComponent={ValueLabelComponent} min={0} max={props.end} valueLabelDisplay="auto" valueLabelFormat={x => msToTime(x)}/>
                <IconButton className={classes.playButton} onClick={handleToggle}>
                    {props.pause ? <PlayArrowIcon/> : <PauseIcon/>}
                </IconButton>
                <Typography variant="body2" component="span">{state.timeDisplay} / {msToTime(props.end)}</Typography>
            </Paper>
        </div>
    )
}
