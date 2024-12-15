import { Controller, Get, Post, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AddLocationDto } from './dtos/AddLocation.dto';

@Controller('locations')
export class LocationsController {
    constructor(private readonly LocationsService: LocationsService) {}

    @Get()
    getLocations() {
        return this.LocationsService.getLocations();
    }

    @Post()
    addLocation(@Body(ValidationPipe) addLocationdDto: AddLocationDto) {
        return this.LocationsService.saveLocation(addLocationdDto);
    }

    @Delete(':id')
    deleteLocation(@Param('id') id: string) {
        return this.LocationsService.deleteLocation(id);
    }
}
