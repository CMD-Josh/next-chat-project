import prisma from '../../lib/prisma'

const client = prisma

export default async function handler(req, res){
    console.log("Joining room: " + JSON.parse(req.body)["id"])
    const reqBody = JSON.parse(req.body)


    const room = await client.room.findFirst({
        where: {id: reqBody["id"]}
    })

    if(room !== null){
        res.status(200).json({"room": room["id"]})
    }else{
        res.status(404).json({"room": null})
    }
}