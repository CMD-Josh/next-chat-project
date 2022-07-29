import prisma from '../../lib/prisma'

const client = prisma

export default async function handler( req, res) {  
  const room = await prisma.room.create({
    data:{}
  })

  res.status(200).json({"Room": room["id"]})
}