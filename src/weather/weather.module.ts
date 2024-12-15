import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { AxiosModule } from 'src/axios/axios.module';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [AxiosModule]
})
export class WeatherModule {}
