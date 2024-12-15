import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { AddLocationDto } from './dtos/AddLocation.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ) {}

    getLocations() {
        return this.locationRepository.find({
            select: {
              user: {
                id: true,
              }
            },
            relations: {
              user: true,
            }
        });
    }

    async saveLocation(createLocationDto: AddLocationDto) {
        const location = this.locationRepository.create(createLocationDto);
        return await this.locationRepository.save(location);
    }

    async deleteLocation(id) {
        return await this.locationRepository.delete({ id });
    }
}