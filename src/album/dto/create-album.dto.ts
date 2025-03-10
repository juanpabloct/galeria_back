import { IsBoolean, IsString } from "class-validator"

export class CreateAlbumDto {
    @IsString()
    name: string
    @IsBoolean()
    isPublic: boolean
}
