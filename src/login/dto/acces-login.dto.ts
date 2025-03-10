import { IsEmail, IsString, MinLength } from "class-validator";

export class AccessLoginDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
