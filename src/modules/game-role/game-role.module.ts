import { Module } from '@nestjs/common';
import { GameRoleService } from './game-role.service';
import { GameRoleController } from './game-role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameRoleSchma } from 'src/entity/game-role.entity';
import { UserSchema } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GameRole', schema: GameRoleSchma },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [GameRoleController],
  providers: [GameRoleService, UserService]
})
export class GameRoleModule { }
