import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/user/dtos/CreateUser.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "src/user/entities/user.entity";
import { LoginDto } from './dtos/login.dto';

@Injectable({})
export class AuthService {
    saltOrRounds: number = 10;

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        if (user && user.password === pass) {
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
        const user = this.userRepository.create(createUserDto);
        const hashPass = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
        user.password = hashPass;
        return await this.userRepository.save(user);
    }
}