import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API || 'http://localhost:500');

socket.on('connect', () => {
    console.log('connection established');
})

export default socket;
