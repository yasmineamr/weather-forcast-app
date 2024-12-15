import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':city')
    getWeather(@Param('city') city: string) {
        return this.weatherService.getWeatherByCity(city);
    }
}
