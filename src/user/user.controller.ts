import { Controller, Get, Post, Delete, Patch, Body, HttpException, HttpStatus, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Get()
    getAllUsers() {
        return this.UserService.getAllUsers();
    }

    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.UserService.createUser(createUserDto);
    }

    @Patch()
    updateUser(@Param(':id') id: string, @Body(ValidationPipe)  updateUserDto: UpdateUserDto) {
        return this.UserService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.UserService.deleteUser(id);
    }
}
