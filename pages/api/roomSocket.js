import { Server } from 'socket.io'
import prisma from '../../lib/prisma'
import takenNames from '../../lib/takenNames'

const client = prisma

export default function handler(req, res){
    if(res.socket.server.io){
        console.log("Socket is already running...")
    }else{
        console.log("Socket is initializing...")
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        io.on('connect', socket => {
            console.log('Connected to: ' + socket.id)

            socket.on('syn-ack', (roomID, name) => {
                console.log('connection from room: ' + roomID)
                socket.join(roomID)

                let connectedNames = takenNames[roomID]
                if(connectedNames){
                    connectedNames.push([socket.id, name])
                }else{
                    connectedNames = [[socket.id, name]]
                }
                socket.name = name
                socket.roomID = roomID
                takenNames[roomID] = connectedNames
                
                let cleanNicknames = []
                let dirtyNicknames = takenNames[socket.roomID]
                for(var i = 0; i < dirtyNicknames.length; i++){
                    cleanNicknames.push(dirtyNicknames[i][1])
                }
                io.in(socket.roomID).emit('update-client-listing', cleanNicknames)
            })

            socket.on('disconnect', () => {
                takenNames[socket.roomID].find((element, index) => {
                    if(element[0] === socket.id){
                        takenNames[socket.roomID].splice(index, 1)
                        return true;
                    }
                })

                let cleanNicknames = []
                let dirtyNicknames = takenNames[socket.roomID]
                for(var i = 0; i < dirtyNicknames.length; i++){
                    cleanNicknames.push(dirtyNicknames[i][1])
                }
                io.in(socket.roomID).emit('update-client-listing', cleanNicknames)

                console.log(socket.name + " disconnected.")
            })

            socket.on('client-message', async (_message, _nickname, _roomID) => {

                const msg = await client.messages.create({
                    data: {
                        message: _message,
                        nickname: _nickname,
                        roomID: _roomID
                    }
                })
                io.in(_roomID).emit('message', msg)
            })
        })
    }

    res.end()
}