import prisma from '../../lib/prisma'

const client = prisma

export default async function handler( req, res) {  
  const room = await prisma.room.create({
    data:{}
  })

  console.log(room)

  res.status(201).json({"Room": room["id"]})
}