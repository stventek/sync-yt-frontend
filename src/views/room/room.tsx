import NavBar from '../../components/navbar/navbar';
import Player from '../../components/player/player';
import Container from '@material-ui/core/Container';
import socket from '../../utilities/socket';
import { useEffect } from 'react';
import { withRouter } from 'react-router';
import AlertDialog from './dialog';
import React from 'react';

function Room(props : any){

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        socket.emit('join-room', localStorage.getItem("username")!, props.room, (status: number) => {
            if(status === 0){
                setOpen(true);
            }
        });
    }, []);

    const handleClose = () => {
        setOpen(false);
        props.history.push('/');
    };

    return (
        <div>
            <AlertDialog handleClose={handleClose} open={open}/>
            <NavBar room={props.room}/>
            <Container maxWidth="lg">
                <Player room={props.room}/>
            </Container>
        </div>
    )
}

export default withRouter(Room);
