import NavBar from '../../components/navbar/navbar';
import Player from '../../components/player/player';
import Container from '@material-ui/core/Container';

export default function Room(props : {room: string}){
 
    return (
        <div>
            <NavBar/>
            <Container maxWidth="xl">
                <Player/>
            </Container>
        </div>
    )
}
