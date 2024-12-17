import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { AddLocationDto } from './dtos/AddLocation.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LocationsService,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
