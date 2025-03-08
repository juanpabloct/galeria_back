import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerConfig: MulterOptions = {
    limits: {
        fileSize: 1024 * 1024 * 20, // 5 MB
    },
};