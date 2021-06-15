import PlayerControls from "./player-controls";
import ReactPlayer from 'react-player';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%',
        marginTop: theme.spacing(2)
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}));

export default function Player(){
    const classes = useStyles();
    return (
        <div>
            <div className={classes.playerWrapper}>
                <ReactPlayer
                className={classes.reactPlayer}
                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                width='100%'
                height='100%'
                />
            </div>
            <PlayerControls start={1000 * 45} end={1000 * 60 * 60}/>
        </div>
    )
}
