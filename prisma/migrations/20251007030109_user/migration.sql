/*
  Warnings:

  - You are about to drop the column `userId` on the `Burger` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Burger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "grade" REAL,
    "price" REAL,
    "gradeDate" DATETIME,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "Burger_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Burger" ("description", "grade", "gradeDate", "id", "image", "name", "price", "restaurantId") SELECT "description", "grade", "gradeDate", "id", "image", "name", "price", "restaurantId" FROM "Burger";
DROP TABLE "Burger";
ALTER TABLE "new_Burger" RENAME TO "Burger";
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "grade" REAL,
    "date" DATETIME NOT NULL,
    "burgerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("burgerId", "content", "date", "grade", "id") SELECT "burgerId", "content", "date", "grade", "id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
