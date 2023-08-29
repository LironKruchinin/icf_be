import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Model } from 'mongoose';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Group } from '../../entity/group.entity';
import { UserService } from '../user/user.service';
import { BasicUserData, User } from 'src/entity/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Group') private groupModel: Model<Group>
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto)
  }

  findAll() {
    return this.groupModel.find().lean().exec()

  }

  findOne(id: string) {
    return this.groupModel.findById(id)
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).lean().exec()
  }

  remove(id: string): Promise<DeleteResult> {
    return this.groupModel.deleteOne({ _id: id }).exec();
  }

  addUserToRole(id: string, basicUserData: BasicUserData) {
    return this.groupModel.findByIdAndUpdate(id,
      { $push: { users: basicUserData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  removeUserToRole(id: string, userId: string) {
    return this.groupModel.findByIdAndUpdate(id,
      { $pull: { users: userId } },
      { new: true })
      .lean()
      .exec()
  }

}
