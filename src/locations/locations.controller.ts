import { Controller, Get, Post, Delete, Body, Param, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AddLocationDto } from './dtos/AddLocation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locations')
export class LocationsController {
    constructor(private readonly LocationsService: LocationsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getLocations(@Request() req: any) {
        return this.LocationsService.getLocations(req?.user?.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addLocation(@Request() req: any, @Body(ValidationPipe) addLocationdDto: AddLocationDto) {
        addLocationdDto.user = req?.user?.userId;
        return this.LocationsService.saveLocation(addLocationdDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteLocation(@Param('id') id: string) {
        return this.LocationsService.deleteLocation(id);
    }
}
