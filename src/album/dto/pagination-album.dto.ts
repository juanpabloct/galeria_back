import { IsNumber, IsOptional } from "class-validator"

export class AlbumPaginationDto {
    @IsOptional()
    @IsNumber()
    page?: number
    @IsOptional()
    @IsNumber()
    limit?: number
}
