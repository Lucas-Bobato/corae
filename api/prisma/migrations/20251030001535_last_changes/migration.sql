/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Restaurants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Restaurants` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Reviews_userId_restaurantId_key";

-- DropIndex
DROP INDEX "public"."Users_username_key";

-- AlterTable
ALTER TABLE "Restaurants" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Reviews_userId_idx" ON "Reviews"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
