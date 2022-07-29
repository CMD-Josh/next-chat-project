/*
  Warnings:

  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Messages` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "posted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomID" TEXT NOT NULL,
    CONSTRAINT "Messages_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Messages" ("id", "message", "nickname", "posted", "roomID") SELECT "id", "message", "nickname", "posted", "roomID" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
