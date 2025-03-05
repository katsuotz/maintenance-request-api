import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MaintenanceRequestsModule } from './module/maintenance-requests/maintenance-requests.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: false,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Schema auto-generation
      playground: true,
      // formatError: (error) => {
      //   console.log(error);
      //   return {
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //     message: error.message,
      //     code: error.extensions?.code || 'SERVER_ERROR',
      //   };
      // },
    }),
    MaintenanceRequestsModule,
  ],
})
export class AppModule {}
