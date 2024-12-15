import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsService],
  controllers: [LocationsController]
})
export class LocationsModule {}
