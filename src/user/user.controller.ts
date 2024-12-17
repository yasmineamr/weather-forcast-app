import { Controller, Get, Delete, Patch, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.UserService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body(ValidationPipe)  updateUserDto: UpdateUserDto) {
        return this.UserService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.UserService.deleteUser(id);
    }
}
