import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';
import { HighlightsModule } from './highlights/highlights.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { KindleController } from './kindle/kindle.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    BooksModule,
    HighlightsModule,
    AuthModule,
  ],
  controllers: [AppController, KindleController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
