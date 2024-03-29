import PlayerControls from "./player-controls";
import YouTubePlayer from "youtube-player";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useEffect} from 'react';
import socket from '../../utilities/socket';
import { useState } from "react";
import { getDuration, seekTo } from "../../utilities/player-fix";

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {

        }
    },
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%'
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}));

type PlayerMeta = {start: number, end: number, pause: boolean, startUnix: number};

export default function Player(props: {room: string}){
    const classes = useStyles();
    const [player, setPlayer] = useState<any>(null);
    const [playerMeta, setPlayerMeta] = useState<PlayerMeta>({start: 0, end: 0, pause: true, startUnix: 0});

    useEffect(() => {
        //type declaration files are wrong, thus the type of any
        const player: any = YouTubePlayer('youtube-player', {height:'100%', width:'100%'});
        setPlayer(player);

        socket.on('play-recive', (videoId: string) => {
            setPlayer((player: any) => {
                player.loadVideoById(videoId);
                getDuration(player, false).then(end => setPlayerMeta(state => ({...state, end, start: 0, pause: false, startUnix: Date.now()})));
                return player;
                }
            )
        })

        socket.on('update', ( playerInfo : {videoId: string, timeElapsed: number, pause: boolean}) => {
            setPlayer((player: any) => {
                player.loadVideoById(playerInfo.videoId);
                //seekTo(player, playerInfo.timeElapsed);
                getDuration(player, playerInfo.pause).then(end => {
                    setPlayerMeta(state => ({...state, start: playerInfo.timeElapsed, end, pause: playerInfo.pause, startUnix: Date.now() - playerInfo.timeElapsed}));
                })
                return player
            })
        });

        socket.on('pause-recive', () => {
            player.pauseVideo()
            setPlayerMeta(state => ({...state, pause: true}))
        });

        socket.on('resume-recive', (timeElapsed) => {
            setPlayer((player: any) => {
                player.playVideo()
                //seekTo(player, timeElapsed);
                setPlayerMeta(state => ({...state, start: timeElapsed, pause: false, startUnix: Date.now() - timeElapsed}));
                return player;
            })
        });

        socket.on('seekTo-recive', (timeElapsed: number) => {
            setPlayer((player: any) => {
                //seekTo(player, timeElapsed);
                setPlayerMeta(state => ({...state, start: timeElapsed,  startUnix: Date.now() - timeElapsed}));
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

    useEffect(() => {
        const seekRepeat = setInterval(async() => {
            if(!playerMeta.pause){
                const start = Date.now() - playerMeta.startUnix
                const playerStart = Math.floor((await player.getCurrentTime()) * 1000)
                const result = Math.abs(start - playerStart)
                if(result > 1000)
                    seekTo(player, start)
            }
            else{
                if(player)
                    player.pauseVideo()
            }
        }, 500)
        return () => {
            clearInterval(seekRepeat)
        }
    }, [playerMeta])

    return (
        <div className={classes.container}>
            <div className={classes.playerWrapper}>
                <div id="youtube-player" className={classes.reactPlayer}/>
            </div>
            {player ? <PlayerControls startUnix={playerMeta.startUnix} pause={playerMeta.pause} room={props.room} player={player} end={playerMeta.end}/> : null}
        </div>
    )
}
