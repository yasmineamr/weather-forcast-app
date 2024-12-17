import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { AxiosService } from "src/axios/axios.service";


@Injectable({})
export class WeatherService {
    constructor(
        private readonly axiosService:AxiosService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    _construct_weather_cache_key(city: string) {
        return `weather:${city.toLowerCase()}`;
    }

    async getWeatherByCity(city: string) {
        if (!city)
            return

        const cacheKey = this._construct_weather_cache_key(city);
        const cachedWeather: string | null = await this.cacheManager.get(cacheKey);

        if (cachedWeather) {
            console.log('Retrieved from cache');
            return JSON.parse(cachedWeather as string);
        }

        const url = process.env.WEATHER_BASE_URL + "/current.json?key=" + process.env.WEATHER_API_KEY + "&q=" + city;
        const currentWeather = await this.axiosService.get(url);

        // TODO: Compute TTL to be till EOD
        await this.cacheManager.set(cacheKey, JSON.stringify(currentWeather));

        return currentWeather;
    }
}
