import NavBar from '../../components/navbar/navbar';
import Player from '../../components/player/player';
import Container from '@material-ui/core/Container';
import socket from '../../utilities/socket';
import { useEffect } from 'react';
import { withRouter } from 'react-router';

function Room(props : any){

    useEffect(() => {
        socket.emit('join-room', localStorage.getItem("username")!, Number(props.room), (status: number) => {
            console.log(status);
            if(status === 0)
                props.history.push('/');
        })
    })

    return (
        <div>
            <NavBar/>
            <Container maxWidth="lg">
                <Player/>
            </Container>
        </div>
    )
}

export default withRouter(Room);
