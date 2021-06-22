import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import msToTime from '../../utilities/ms-to-time';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import socket from '../../utilities/socket';
import { useState } from 'react';
import { useEffect } from 'react';

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
    pause: boolean
}

export default function PlayerControls(props: controlsProps){

    const [time, setTime] = useState(0);

    //takes player current time and sync it with the slider
    useEffect(() => {
        const interval = setInterval(() => {
            props.player.getCurrentTime().then((time : any) => {
                setTime(time * 1000);
            })
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    },[])

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
            <Paper>
                <Slider style={{margin: 0}} value={time} onChangeCommitted={handleSeekTo} color="secondary" ValueLabelComponent={ValueLabelComponent} min={0} max={props.end} valueLabelDisplay="auto" valueLabelFormat={x => msToTime(x)}/>
                <IconButton onClick={handleToggle}>
                    {props.pause ? <PlayArrowIcon/> : <PauseIcon/>}
                </IconButton>
            </Paper>
        </div>
    )
}
