-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "posted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomID" TEXT NOT NULL,
    CONSTRAINT "Messages_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
