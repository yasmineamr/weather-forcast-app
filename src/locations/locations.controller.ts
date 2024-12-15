import { Controller, Get, Post, Delete, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AddLocationDto } from './dtos/AddLocation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locations')
export class LocationsController {
    constructor(private readonly LocationsService: LocationsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getLocations() {
        return this.LocationsService.getLocations();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addLocation(@Body(ValidationPipe) addLocationdDto: AddLocationDto) {
        return this.LocationsService.saveLocation(addLocationdDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteLocation(@Param('id') id: string) {
        return this.LocationsService.deleteLocation(id);
    }
}
