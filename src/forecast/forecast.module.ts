import { Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { AxiosModule } from 'src/axios/axios.module';


@Module({
  providers: [ForecastService],
  controllers: [ForecastController],
  imports: [AxiosModule]
})
export class ForecastModule {}
