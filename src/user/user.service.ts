import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";
import { UserEntity } from "./user.entity";
import { LoginUserDto, SignUpDto, UpdateUserDto } from "./dto";
import { UserRO } from "./user.interface";
import { validate } from "class-validator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { HttpStatus } from "@nestjs/common";
import * as argon2 from "argon2";
import {
    DataStoredInAccessToken,
    DataStoredInRefreshToken,
} from "../shared/interface/auth.interface";
import * as crypto from "crypto";
import { createTokenPair } from "../shared/utils/authUtils";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    /*
     *  @gnoud: Find all users
     */
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    /*
     *  @gnoud: Find one user by email and password ()
     */
    async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            return user;
        }

        return null;
    }

    /*
     *  @gnoud: Create new user (signup)
     */
    async create(dto: SignUpDto): Promise<UserRO> {
        // check uniqueness of username/email
        const { email, password } = dto;
        const qb = getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.email = :email", { email });

        const user = await qb.getOne();

        if (user) {
            throw new HttpException(
                { message: "Email is already in use" },
                HttpStatus.BAD_REQUEST,
            );
        }

        // create new user
        let newUser = new UserEntity();
        newUser.email = email;
        newUser.password = password;
        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new HttpException(
                { message: "Input data validation failed", errors: null },
                400,
            );
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }
    }

    /*
     *  @gnoud: Update user
     */
    async update(id: number, dto): Promise<UserEntity> {
        let toUpdate = await this.userRepository.findOne({ where: { id: id } });
        if (!toUpdate) {
            throw new HttpException({ message: "Invalid request" }, 401);
        }
        delete toUpdate.password;
        delete toUpdate.publicKey;

        if (dto.avatar === "No changes") {
            delete dto.avatar;
            delete toUpdate.avatar;
        }

        let updated = Object.assign(toUpdate, dto);
        const a = await this.userRepository.save(updated);
        console.log("🚀 ~ UserService ~ update ~ a:", a);

        return a;
    }

    /*
     *  @gnoud: Find user by id
     */
    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new HttpException({ message: "Invalid request" }, 401);
        }

        return user;
    }

    /*
     *  @gnoud: Find user by email
     */
    async findByEmail(email: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (!user) {
            throw new HttpException({ message: "Invalid request" }, 401);
        }

        return this.buildUserRO(user);
    }

    generateTokens = async (
        payloadAccess: DataStoredInAccessToken,
        payloadRefresh: DataStoredInRefreshToken,
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> => {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        });
        let publicKeyString = "";
        publicKeyString = await this.savePublicKey({
            userId: Number(payloadAccess.userId),
            publicKey,
        });

        if (!publicKeyString)
            throw new HttpException(
                {
                    message: "Error create key token",
                    error: null,
                },
                400,
            );

        return await createTokenPair(
            payloadAccess,
            payloadRefresh,
            publicKeyString,
            privateKey,
        );
    };

    private savePublicKey = async ({
        userId,
        publicKey,
    }: {
        userId: number;
        publicKey: any;
    }): Promise<any> => {
        const publicKeyString = publicKey.toString();

        // save key to db
        const toUpdate = await this.userRepository.findOne({
            where: { id: userId },
        });

        toUpdate.publicKey = publicKeyString;
        return await this.userRepository.save(toUpdate);
    };

    private buildUserRO(user: UserEntity) {
        const userRO = {
            id: user.id,
            email: user.email,
            dob: user.dob,
            avatar: user.avatar,
            description: user.description,
        };

        return { user: userRO };
    }
}
