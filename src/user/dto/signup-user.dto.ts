import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
