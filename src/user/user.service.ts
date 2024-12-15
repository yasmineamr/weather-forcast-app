import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    getAllUsers() {
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async updateUser(id, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update({ id }, updateUserDto);
    }

    async deleteUser(id) {
        return await this.userRepository.delete({ id });
    }
}
