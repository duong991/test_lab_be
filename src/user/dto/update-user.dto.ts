import { IsString, MaxLength, IsDateString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MaxLength(128)
    readonly description?: string;

    @IsDateString()
    readonly dob?: string;
}
