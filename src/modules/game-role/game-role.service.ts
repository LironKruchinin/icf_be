import { Injectable } from '@nestjs/common';
import { CreateGameRoleDto } from './dto/create-game-role.dto';
import { UpdateGameRoleDto } from './dto/update-game-role.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GameRole } from './entities/game-role.entity';
import { BasicUserData, DeleteResult, GameRoleData, User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';
import { ReducedUser } from 'src/entity/group.entity';

let _users: ReducedUser[]

@Injectable()
export class GameRoleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('GameRole') private gameRoleModel: Model<GameRole>
  ) { }

  async create(createGameRoleDto: CreateGameRoleDto) {
    const newRole = await this.gameRoleModel.create(createGameRoleDto)
    // const users = (await this.userService.getAllUsers()).filter(user =>
    //   user.roles.includes('member') ||
    //   user.roles.includes('owner') ||
    //   user.roles.includes('admin'))
    // console.log(users);


    return newRole
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

  async addGameRoleToUser(id: string, gameRoleData: GameRoleData) {
    return this.userModel.findByIdAndUpdate(id,
      { $push: { gameRole: gameRoleData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  async removeGameRoleFromUser(id: string, missionId: string) {

    return this.userModel.findByIdAndUpdate(id,
      { $pull: { missions: { _id: missionId } } },
      { new: true })
      .lean()
      .exec();
  }

  // addUserToRole(id: string, basicUserData: BasicUserData) {
  //   return this.gameRoleModel.findByIdAndUpdate(id,
  //     { $push: { users: basicUserData } },
  //     { new: true, upsert: true })
  //     .lean()
  //     .exec()
  // }

  // removeUserToRole(id: string, userId: string) {
  //   return this.gameRoleModel.findByIdAndUpdate(id,
  //     { $pull: { users: userId } },
  //     { new: true })
  //     .lean()
  //     .exec()
  // }
}
