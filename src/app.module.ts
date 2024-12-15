import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule} from '@nestjs/config';
import { PostgreSqlDataSource } from './config/ormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { ForecastModule } from './forecast/forecast.module';
import { FavoriteModule } from './favorite/favorite.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { AxiosModule } from './axios/axios.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'redis',
    //   port: 6379,
    // }),
    UserModule,
    WeatherModule,
    ForecastModule,
    FavoriteModule,
    AxiosModule,
    LocationsModule,
    // TypeOrmModule.forRoot(PostgreSqlDataSource)
  ],
  exports: [ConfigModule],
  controllers: [AppController, AuthController, WeatherController],
  providers: [AppService, AuthService, WeatherService],
})
export class AppModule {}
