import PlayerControls from "./player-controls";
import YouTubePlayer from "youtube-player";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useEffect} from 'react';
import socket from '../../utilities/socket';
import { useState } from "react";
import { getDuration } from "../../utilities/player-fix";

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

export default function Player(props: {room: string}){
    const classes = useStyles();

    const [player, setPlayer] = useState<null | any>(null);
    const [playerMeta, setPlayerMeta] = useState({start: 0, end: 0});

    useEffect(() => {
        //type declaration files are wrong
        const player: any = YouTubePlayer('youtube-player', {height:'100%', width:'100%'});
        setPlayer(player);

        socket.on('play-recive', (videoId: string) => {
            player.loadVideoById(videoId);
            getDuration(player, false).then(end => {
                setPlayerMeta({...playerMeta, start: 0, end})
            })
        });
    }, []);

    return (
        <div>
            <div className={classes.playerWrapper}>
                <div id="youtube-player" className={classes.reactPlayer}/>
            </div>
            {player ? <PlayerControls room={props.room} player={player} start={playerMeta.start} end={playerMeta.end}/> : null}
        </div>
    )
}
