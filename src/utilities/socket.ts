import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_WS || '');

socket.on('connect', () => {
    console.log('connection established');
})

export default socket;
