import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import msToTime from '../../utilities/ms-to-time';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {useState} from 'react';
import { useEffect } from 'react';
import socket from '../../utilities/socket';

function ValueLabelComponent(props: any) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

type controlsProps = {
    start: number,
    end: number,
    player: any,
    room: string
}

export default function PlayerControls(props: controlsProps){
    const [state, setState] = useState({pause: true});

    useEffect(() => {
        props.player.on('stateChange', (event: any) => {
            const pause = event.data === 2 ? true : false;
            setState({pause: pause});
        });

        socket.on('pause-recive', () => {
            props.player.pauseVideo();
        })

        socket.on('resume-recive', () => {
            props.player.playVideo();
        })
    },[]);

    const handleToggle = (e: any) => {
        if(state.pause)
            socket.emit('resume', props.room);
        else
            socket.emit('pause', props.room);
    };
    
    return (
        <div>
            <Paper>
                <Slider style={{margin: 0}} defaultValue={props.start} color="secondary" ValueLabelComponent={ValueLabelComponent} min={props.start * 1000} max={props.end * 1000} valueLabelDisplay="auto" valueLabelFormat={x => msToTime(x)}/>
                <IconButton onClick={handleToggle}>
                    {state.pause ? <PlayArrowIcon/> : <PauseIcon/>}
                </IconButton>
            </Paper>
        </div>
    )
}
