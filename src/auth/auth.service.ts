import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login() {
        const payload = { username: "mhossny", sub: "1" };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    signup() {
        return "I am up";
    }
}