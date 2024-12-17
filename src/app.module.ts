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
import * as redisStore from 'cache-manager-redis-store';
import { AxiosModule } from './axios/axios.module';
import { LocationsModule } from './locations/locations.module';
import { AuthModule } from './auth/auth.module';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloServer } from 'apollo-server-express';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   driver: ApolloServer
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
    AuthModule,
    UserModule,
    WeatherModule,
    ForecastModule,
    AxiosModule,
    LocationsModule,
    TypeOrmModule.forRoot(PostgreSqlDataSource)
  ],
  exports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
