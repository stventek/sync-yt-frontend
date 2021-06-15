import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import msToTime from '../../utilities/ms-to-time';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {useState} from 'react';

const useStyles = makeStyles((theme) => {
    return {
        controls: {
           
        }
    }
});


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
    end: number
}

export default function PlayerControls(props: controlsProps){
    const classes = useStyles();
    const [state, setState] = useState({pause: true});
    return (
        <div>
            <Paper className={classes.controls}>
                <Slider style={{margin: 0}} defaultValue={props.start} color="secondary" ValueLabelComponent={ValueLabelComponent} min={0} max={1000 * 60 * 60} valueLabelDisplay="auto" valueLabelFormat={x => msToTime(x)}/>
                <IconButton>
                    {state.pause ? <PlayArrowIcon/> : <PauseIcon/>}
                </IconButton>
            </Paper>
        </div>
    )
}
