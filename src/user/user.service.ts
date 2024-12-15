import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    getAllUsers() {
        return this.userRepository.find({
            select: {
                password: false
            }
        });
    }

    getUserByUsername(username) {
        return this.userRepository.findOne({
            where: { username },
            select: {
                password: false,
            }
        });
    }

    async updateUser(id, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update({ id }, updateUserDto);
    }

    async deleteUser(id) {
        return await this.userRepository.delete({ id });
    }
}
