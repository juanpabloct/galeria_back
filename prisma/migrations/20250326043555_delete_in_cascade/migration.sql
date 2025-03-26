-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_user_id_fkey";

-- DropForeignKey
ALTER TABLE "images_user" DROP CONSTRAINT "images_user_user_id_fkey";

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_user" ADD CONSTRAINT "images_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
