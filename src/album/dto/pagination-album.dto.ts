import { IsNumber } from "class-validator"

export class AlbumPaginationDto {
    @IsNumber()
    page?: number
    @IsNumber()
    limit?: number
}
