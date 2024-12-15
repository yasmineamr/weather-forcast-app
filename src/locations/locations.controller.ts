import { Controller, Get, Post, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
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
    addLocation(@Body()  addLocationdDto: AddLocationDto) {
        if(addLocationdDto.city == "") throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        return this.LocationsService.saveLocation(addLocationdDto.city);
    }

    @Delete(':id')
    deleteLocation(@Param('id') id: string) {
        return this.LocationsService.deleteLocation(id);
    }
}
