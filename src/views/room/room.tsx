import NavBar from '../../components/navbar/navbar';
import Player from '../../components/player/player';
import Container from '@material-ui/core/Container';
import socket from '../../utilities/socket';
import { useEffect } from 'react';
import AlertDialog from './dialog';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default function Room(props : RouteComponentProps<{room: string}>){

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        socket.emit('join-room', localStorage.getItem("username")!, props.match.params.room, (status: number) => {
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
            <NavBar room={props.match.params.room}/>
            <Container maxWidth="lg">
                <Player room={props.match.params.room}/>
            </Container>
        </div>
    )
}
