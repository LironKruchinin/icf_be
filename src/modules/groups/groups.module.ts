import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from 'src/entity/group.entity';
import { UserSchema } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [GroupsController],
  providers: [GroupsService, UserService]
})
export class GroupsModule { }
