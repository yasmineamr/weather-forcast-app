import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/user/dtos/CreateUser.dto";
import { LoginDto } from './dtos/Login.dto';
import { IS_STRONG_PASSWORD } from "class-validator";

@Injectable({})
export class AuthService {
    saltOrRounds: number = 10;

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        const isMatch = await bcrypt.compare(pass, user?.password);

        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByUsername(loginDto.username);
        const isMatch = await bcrypt.compare(loginDto.password, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }
        
        const payload = { sub: user.id, username: user.username };
        
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
    
    async signup(createUserDto: CreateUserDto) {
        let user = await this.userService.createUser(createUserDto, false);
        const hashPass = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
        const data = {
            ...user,
            password: hashPass
        };
        user = await this.userService.createUser(data, true);
        const { password, ...result } = data;
        return result;
    }
}