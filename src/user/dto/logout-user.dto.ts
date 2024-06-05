import { IsNotEmpty } from "class-validator";

export class LogoutUserDto {
    @IsNotEmpty()
    readonly refreshToken: string;
}
