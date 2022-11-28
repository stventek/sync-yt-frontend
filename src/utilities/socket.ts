import io from 'socket.io-client';

const socket = io('http://192.168.0.200:5000/');

socket.on('connect', () => {
    console.log('connection established');
})

export default socket;
