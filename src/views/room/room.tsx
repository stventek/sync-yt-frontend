import NavBar from '../../components/navbar/navbar';
import Player from '../../components/player/player';
import Container from '@material-ui/core/Container';
import socket from '../../utilities/socket';
import { useEffect } from 'react';
import AlertDialog from './dialog';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Chat from '../../components/chat/chat';

const useStyles = makeStyles(theme => ({
    maxWithXl: {
        maxWidth: 1700
    },
    container: {
        paddingTop: theme.spacing(2),
        height: `calc(100vh - 64px)`,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        }
    },
    gridContainer: {
        display: 'flex',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    }
}))

export default function Room(props : RouteComponentProps<{room: string}>){

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        socket.emit('join-room', 
            localStorage.getItem("username")!, 
            props.match.params.room,
            localStorage.getItem("color")!,
            (status: number) => {
                if(status === 0){
                    setOpen(true);
                }
        });

        return () => {
            socket.emit('leave', props.match.params.room);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        props.history.push('/');
    };

    return (
        <div>
            <AlertDialog handleClose={handleClose} open={open}/>
            <NavBar room={props.match.params.room} withChangeVideoInput={true} useConfigDialog={true}/>
            <Container maxWidth="lg"  classes={{maxWidthXl: classes.maxWithXl, root: classes.container}}>
                <div className={classes.gridContainer}>
                    <Player room={props.match.params.room}/>
                    <Chat room={props.match.params.room}/>
                </div>
            </Container>
        </div>
    )
}
