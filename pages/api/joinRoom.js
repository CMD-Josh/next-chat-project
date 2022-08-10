import prisma from '../../lib/prisma'
import takenNames from '../../lib/takenNames'

const client = prisma

export default async function handler(req, res){
    const reqBody = JSON.parse(req.body)


    const room = await client.room.findFirst({
        where: {id: reqBody["id"]}
    })

    if(room !== null){
        let roomNames = takenNames[room["id"]]
        
        let isTaken = true
        if(roomNames){
            isTaken = roomNames.find(name => name[1] === reqBody["name"]) ? true: false
        }

        if(!isTaken || !roomNames){
            res.status(200).json({"room": room["id"]})
        }else{
            console.log("Name is already taken")
            res.status(401).json({"error": "Nickname is already taken."})
        }
        
    }else{
        res.status(404).json({"error": "Room does not exist."})
    }
}