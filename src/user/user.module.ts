import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
// import { AuthMiddleware } from "./auth.middleware";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, JwtService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
