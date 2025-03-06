/*
  Warnings:

  - Added the required column `isPublic` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `images_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "album" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "images_user" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;
