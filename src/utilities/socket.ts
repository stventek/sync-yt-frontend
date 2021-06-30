import io from 'socket.io-client';

const socket = io('https://sync-yt-backend.herokuapp.com/');

socket.on('connect', () => {
    console.log('connection established');
})

export default socket;
