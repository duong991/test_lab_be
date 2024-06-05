import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_TYPE,
    DB_USER,
} from "./shared/config";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: DB_TYPE,
            host: DB_HOST,
            port: +DB_PORT,
            username: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            entities: ["src/**/**.entity{.ts,.js}"],
            synchronize: true,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {}
}
