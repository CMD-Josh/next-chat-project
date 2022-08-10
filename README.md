# Project Description
This project was created so that I could learn some web technologies that I have been curious about for a while now. After pondering as to what project would be best, ~~with the help of miscelanious dev blogs,~~ I decided that a simple web chat application where users can enter a room and talk to each other would be a good starting point.

Technologies used in this project (That I've learned about):
- React
- NextJS
- Prisma
- SocketIO
- Typescript


While I have gained a baseline understanding of these technologies, I've also enjoyed the process of doing so as well.
Granted, the commit history may state otherwise. I can assure you that those few days of inactivity were not caused by any sort of disinterest, but rather a local heatwave making it difficult to work.

# Getting started
Open your terminal in whatever directory you wish to download the project into and type the following
1. `git clone https://github.com/CMD-Josh/next-chat-project`
2. `npm install`
3. Create a file called .env in the projects root folder
4. Enter  `DATABASE_URL=file:./dev.db` into the .env file. <br/>
This is the location of where you want the database to be.
5. Run `npx prisma migrate dev --name init` to sync the database with the schema
6. `npm run dev`
