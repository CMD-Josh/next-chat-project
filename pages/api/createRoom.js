import prisma from '../../lib/prisma'
import takenNames from '../../lib/takenNames'

const client = prisma

export default async function handler( req, res) {  
  const room = await prisma.room.create({
    data:{}
  })

  console.log(room)
  takenNames[room["id"]] = []

  res.status(201).json({"Room": room["id"]})
}