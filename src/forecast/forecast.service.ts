import { Injectable } from "@nestjs/common";
import { AxiosService } from "src/axios/axios.service";

@Injectable({})
export class ForecastService {
    constructor(private readonly axiosService:AxiosService) {}

    getForecastByCity(city) {
        const url = process.env.WEATHER_BASE_URL + "/forecast.json?key=" + process.env.WEATHER_API_KEY + "&q=" + city + "&days=" + process.env.WEATHER_FORECAST_DAYS;
        return this.axiosService.get(url);
    }
}