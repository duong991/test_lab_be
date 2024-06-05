import {
    Get,
    Post,
    Body,
    Put,
    Controller,
    UsePipes,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginUserDto, UpdateUserDto } from "./dto";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { User } from "./user.decorator";
import { ValidationPipe } from "../shared/pipes/validation.pipe";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/signup-user.dto";
import {
    DataStoredInAccessToken,
    DataStoredInRefreshToken,
} from "../shared/interface/auth.interface";
import { OK } from "../shared/helpers/valid_responses/success.response";
import { LogoutUserDto } from "./dto/logout-user.dto";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import { diskStorage } from "multer";
@ApiBearerAuth()
@ApiTags("user")
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get("user")
    @UseGuards(JwtAuthGuard)
    async findMe(@User("email") email: string) {
        const result = await this.userService.findByEmail(email);

        return new OK({ data: result.user }).send();
    }

    @Post("user/update")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("avatar", {
            storage: diskStorage({
                destination: join(__dirname, "..", "public", "upload"),
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join("");
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    @UsePipes(new ValidationPipe())
    async update(
        @UploadedFile() file = "No changes" as any,
        @User() user: { userId: number; email: string },
        @Body("description") description: string,
        @Body("dob") dob: string,
    ) {
        const updateData: UpdateUserDto = {
            description: description || "",
            dob: dob || "",
        };
        const result = await this.userService.update(user.userId, {
            ...updateData,
            avatar: file?.filename || file,
        });

        return new OK({
            message: "User updated successfully",
            data: result,
        }).send();
    }

    @UsePipes(new ValidationPipe())
    @Post("users/login")
    async login(@Body() loginUserDto: LoginUserDto) {
        const _user = await this.userService.findOne(loginUserDto);

        if (!_user) throw new HttpException({ message: "Login failed" }, 401);

        const { email, avatar } = _user;

        const dataStoredInAccessToken: DataStoredInAccessToken = {
            userId: _user.id,
        };
        const dataStoredInRefreshToken: DataStoredInRefreshToken = {
            userId: _user.id,
            email,
        };

        const tokens = await this.userService.generateTokens(
            dataStoredInAccessToken,
            dataStoredInRefreshToken,
        );

        return new OK({
            message: "Login successful",
            data: {
                user: _user,
                tokens,
            },
        }).send();
    }

    @UsePipes(new ValidationPipe())
    @Post("users/signup")
    async signup(@Body("") signupDto: SignUpDto) {
        await this.userService.create(signupDto);

        return new OK({
            message: "Signup successful",
        }).send();
    }

    @UsePipes(new ValidationPipe())
    @Post("users/logout")
    async logout(@Body("") logoutDto: LogoutUserDto) {
        return new OK({
            message: "Logout successful",
        }).send();
    }
}
