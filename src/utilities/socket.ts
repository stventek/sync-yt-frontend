import io from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('connection established');
})

export default socket;
