import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateLoginDto {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}
