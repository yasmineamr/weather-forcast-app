import { Controller, Post, UseGuards, ValidationPipe, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from "src/user/dtos/CreateUser.dto";
import { LoginDto } from "./dtos/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body(ValidationPipe) loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post()
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }
}