import { Server } from 'socket.io'
import prisma from '../../lib/prisma'
import takenNames from '../../lib/takenNames'

const client = prisma

export default (req, res) => {
    if(res.socket.server.io){
        console.log("Socket is already running...")
    }else{
        console.log("Socket is initializing...")
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        console.log('taken names:')
        console.log(takenNames)
        io.on('connect', socket => {
            console.log('Connected to: ' + socket.id)

            socket.on('syn-ack', (roomID, name) => {
                console.log('connection from room: ' + roomID)
                socket.join(roomID)

                let connectedNames = takenNames[roomID]
                if(connectedNames){
                    connectedNames.push(name)
                }else{
                    connectedNames = [name]
                }
                takenNames[roomID] = connectedNames
            })

            socket.on('disconnect', () => {
                console.log(socket.id + " disconnected.")
            })

            socket.on('client-message', async (_message, _nickname, _roomID) => {

                const msg = await client.messages.create({
                    data: {
                        message: _message,
                        nickname: _nickname,
                        roomID: _roomID
                    }
                })

                console.log("Message created on database with data:")
                console.log(msg)

                io.in(_roomID).emit('message', msg)
            })
        })
    }

    res.end()
}