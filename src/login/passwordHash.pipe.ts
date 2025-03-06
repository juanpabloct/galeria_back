
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { hash } from 'src/utils/encrypt';

@Injectable()
export class PasswordHash implements PipeTransform {
    async transform(value: CreateLoginDto, _: ArgumentMetadata) {
        console.log("entroooo");

        const passwordHash = await hash(value.password)
        value.password = passwordHash
        return value;
    }
}
