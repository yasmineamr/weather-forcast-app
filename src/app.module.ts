import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosModule } from './axios/axios.module';
import { PostgreSqlDataSource } from './config/ormConfig';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { ForecastModule } from './forecast/forecast.module';
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
    ThrottlerModule.forRoot([{
      ttl: 60000, // in milliseconds
      limit: 10,
    }]),
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
