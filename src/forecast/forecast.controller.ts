import { Controller, Get, Param } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
    constructor(private readonly forecastService: ForecastService) {}

    @Get(':city')
    getforecast(@Param('city') city: string) {
        return this.forecastService.getForecastByCity(city);
    }
}
