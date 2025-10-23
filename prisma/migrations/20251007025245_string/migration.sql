/*
  Warnings:

  - You are about to alter the column `grade` on the `Burger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `price` on the `Burger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `grade` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `grade` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    CONSTRAINT "Comment_burgerId_fkey" FOREIGN KEY ("burgerId") REFERENCES "Burger" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("burgerId", "content", "date", "grade", "id") SELECT "burgerId", "content", "date", "grade", "id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "grade" REAL,
    "gradeDate" DATETIME,
    "notes" TEXT,
    "location" TEXT,
    "justDelivery" BOOLEAN
);
INSERT INTO "new_Restaurant" ("grade", "gradeDate", "id", "justDelivery", "location", "name", "notes") SELECT "grade", "gradeDate", "id", "justDelivery", "location", "name", "notes" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
