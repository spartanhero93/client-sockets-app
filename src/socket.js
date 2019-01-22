import io from 'socket.io-client'

const socket = io('https://sockets-server-express.herokuapp.com/')

export default socket
