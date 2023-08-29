import { Injectable } from '@nestjs/common';
import { CreateGameRoleDto } from './dto/create-game-role.dto';
import { UpdateGameRoleDto } from './dto/update-game-role.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GameRole } from './entities/game-role.entity';
import { BasicUserData, DeleteResult, User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class GameRoleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('GameRole') private gameRoleModel: Model<GameRole>
  ) { }

  create(createGameRoleDto: CreateGameRoleDto) {
    return this.gameRoleModel.create(createGameRoleDto)
  }

  findAll() {
    return this.gameRoleModel.find().lean().exec()
  }

  findOne(id: string) {
    return this.gameRoleModel.findById(id)
  }

  update(id: string, updateGameRoleDto: UpdateGameRoleDto) {
    return this.gameRoleModel.findByIdAndUpdate(id, updateGameRoleDto, { new: true }).lean().exec()
  }

  remove(id: string): Promise<DeleteResult> {
    return this.gameRoleModel.deleteOne({ _id: id }).exec();
  }

  addUserToRole(id: string, basicUserData: BasicUserData) {
    return this.gameRoleModel.findByIdAndUpdate(id,
      { $push: { users: basicUserData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  removeUserToRole(id: string, userId: string) {
    return this.gameRoleModel.findByIdAndUpdate(id,
      { $pull: { users: userId } },
      { new: true })
      .lean()
      .exec()
  }
}
