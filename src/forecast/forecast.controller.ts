import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('forecast')
export class ForecastController {
    constructor(private readonly forecastService: ForecastService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':city')
    getforecast(@Param('city') city: string) {
        return this.forecastService.getForecastByCity(city);
    }
}
