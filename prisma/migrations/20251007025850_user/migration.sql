/*
  Warnings:

  - Added the required column `userId` to the `Burger` table without a default value. This is not possible if the table is not empty.

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
    "userId" TEXT NOT NULL,
    CONSTRAINT "Burger_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Burger" ("description", "grade", "gradeDate", "id", "image", "name", "price", "restaurantId") SELECT "description", "grade", "gradeDate", "id", "image", "name", "price", "restaurantId" FROM "Burger";
DROP TABLE "Burger";
ALTER TABLE "new_Burger" RENAME TO "Burger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
