import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { jwtDecode } from "jwt-decode";
import { DataStoredInAccessToken } from "../interface/auth.interface";
import { UserService } from "../../user/user.service";
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            return false;
        }

        // decode token
        const decoded = jwtDecode(token) as DataStoredInAccessToken;

        //get public key
        try {
            const user = await this.userService.findById(decoded.userId);
            if (!user) {
                return false;
            }
            this.jwtService.verify(token, {
                secret: user.publicKey,
            });
            request.user = { userId: user.id, email: user.email };

            return true;
        } catch (err) {
            return false;
        }
    }
}
