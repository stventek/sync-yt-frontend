import PlayerControls from "./player-controls";
import YouTubePlayer from "youtube-player";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useEffect} from 'react';
import socket from '../../utilities/socket';
import { useState } from "react";
import { getDuration, seekTo } from "../../utilities/player-fix";

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

type PlayerMeta = {start: number, end: number, pause: boolean};

export default function Player(props: {room: string}){
    const classes = useStyles();
    const [player, setPlayer] = useState<any>(null);
    const [playerMeta, setPlayerMeta] = useState<PlayerMeta>({start: 0, end: 0, pause: true});

    useEffect(() => {
        //type declaration files are wrong, thus the type of any
        const player: any = YouTubePlayer('youtube-player', {height:'100%', width:'100%'});
        setPlayer(player);

        socket.on('play-recive', (videoId: string) => {
            setPlayer((player: any) => {
                player.loadVideoById(videoId);
                getDuration(player, false).then(end => setPlayerMeta(state => ({...state, end, start: 0, pause: false})));
                return player;
                }
            )
        })

        socket.on('update', ( playerInfo : {videoId: string, timeElapsed: number, pause: boolean}) => {
            setPlayer((player: any) => {
                player.loadVideoById(playerInfo.videoId);
                if(playerInfo.pause)
                    player.pauseVideo();
                seekTo(player, playerInfo.timeElapsed);
                getDuration(player, playerInfo.pause).then(end => {
                    setPlayerMeta(state => ({...state, start: playerInfo.timeElapsed, end, pause: playerInfo.pause}));
                })
                return player;
            })
        });

        socket.on('pause-recive', () => {
            player.pauseVideo();
            setPlayerMeta(state => ({...state, pause: true}));
        });

        socket.on('resume-recive', (timeElapsed) => {
            setPlayer((player: any) => {
                player.playVideo();
                seekTo(player, timeElapsed);
                setPlayerMeta(state => ({...state, start: timeElapsed, pause: false}));
                return player;
            })
        });

        socket.on('seekTo-recive', (timeElapsed: number) => {
            setPlayer((player: any) => {
                seekTo(player, timeElapsed);
                setPlayerMeta(state => ({...state, start: timeElapsed}));
                return player;
            })
        })

        return () => {
            socket.off('play-recive');
            socket.off('update');
            socket.off('pause-recive');
            socket.off('resume-recive');
            socket.off('seekTo-recive');
        }
    }, []);

    return (
        <div>
            <div className={classes.playerWrapper}>
                <div id="youtube-player" className={classes.reactPlayer}/>
            </div>
            {player ? <PlayerControls pause={playerMeta.pause} room={props.room} player={player} end={playerMeta.end}/> : null}
        </div>
    )
}
