import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsEmail } from "class-validator";
import * as argon2 from "argon2";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: "" })
    avatar: string;

    @Column({ default: "" })
    description: string;

    @Column({ default: "" })
    dob: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
    @Column({ type: "text", default: null })
    publicKey: string;
}
