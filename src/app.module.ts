import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { GroupsModule } from './modules/groups/groups.module';
import { GameRoleModule } from './modules/game-role/game-role.module';
import { RoleModule } from './modules/role/role.module';
import * as cookieParser from 'cookie-parser';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    EventModule,
    GroupsModule,
    GameRoleModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
  }
}
