import io from 'socket.io-client'

const socket = io('https://sockets-io-server.herokuapp.com/')

export default socket
