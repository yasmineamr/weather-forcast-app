import { Injectable } from "@nestjs/common";
import { AxiosService } from "src/axios/axios.service";

@Injectable({})
export class WeatherService {
    constructor(private readonly axiosService:AxiosService) {}

    getWeatherByCity(city) {
        const url = process.env.WEATHER_BASE_URL + "/current.json?key=" + process.env.WEATHER_API_KEY + "&q=" + city;
        return this.axiosService.get(url);
    }
}