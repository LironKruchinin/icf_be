import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchma } from 'src/entity/role.entity';
import { UserSchema } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchma },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService, UserService]
})
export class RoleModule { }
