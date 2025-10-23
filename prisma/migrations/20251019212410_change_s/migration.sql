/*
  Warnings:

  - You are about to drop the column `price` on the `Burger` table. All the data in the column will be lost.

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
    "priceAlone" REAL,
    "priceMeal" REAL,
    "priceDiscount" REAL,
    "gradeDate" DATETIME,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "Burger_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Burger" ("description", "grade", "gradeDate", "id", "image", "name", "restaurantId") SELECT "description", "grade", "gradeDate", "id", "image", "name", "restaurantId" FROM "Burger";
DROP TABLE "Burger";
ALTER TABLE "new_Burger" RENAME TO "Burger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
