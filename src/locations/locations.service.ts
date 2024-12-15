import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ) {}

    getLocations() {
        return this.locationRepository.find();
    }

    async saveLocation(city) {
        const createLocationDto = {
            city
        };
        const location = this.locationRepository.create(createLocationDto);
        return await this.locationRepository.save(location);
    }

    async deleteLocation(id) {
        return await this.locationRepository.delete({ id });
    }
}