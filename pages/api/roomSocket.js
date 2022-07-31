import { Server } from 'socket.io'

export default function handler(req, res){

    if(res.socket.server.io){
        console.log("Socket is already running...")
    }else{
        console.log("Socket is initializing...")
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connect', socket => {
            socket.on('client-message', (message, nickname, roomID) => {
                const data = {
                    msg: message,
                    name: nickname,
                    id: roomID
                }
                console.log(data)
            })
        })
    }

    res.end()
}