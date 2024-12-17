import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

const mockUserService = {
  getAllUsers: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);

  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: '1', firstname: 'Yasmine', lastname: 'Amr' }, { id: '2', firstname: 'Salma', lastname: 'Ahmed' }];
      mockUserService.getAllUsers.mockResolvedValue(result);

      expect(await controller.getAllUsers()).toBe(result);
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { firstname: 'Yasmine' };
      const result = { id, ...updateUserDto };
      mockUserService.updateUser.mockResolvedValue(result);

      expect(await controller.updateUser(id, updateUserDto)).toBe(result);
      expect(mockUserService.updateUser).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const id = '1';
      mockUserService.deleteUser.mockResolvedValue({ affected: 1 });

      expect(await controller.deleteUser(id)).toEqual({ affected: 1 });
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(id);
    });
  });
});
