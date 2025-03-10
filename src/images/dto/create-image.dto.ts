import { Transform } from "class-transformer"
import { IsBoolean, IsNumber } from "class-validator"

export class CreateImageDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isPublic: boolean
}
export class CreateParamsImage {
    @IsNumber()
    user_id: number
    @IsNumber()
    album_id: number
}
