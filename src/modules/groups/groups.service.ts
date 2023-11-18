import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Model } from 'mongoose';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Group, ReducedUser } from '../../entity/group.entity';
import { UserService } from '../user/user.service';
import { BasicUserData, GroupData, User } from 'src/entity/user.entity';

// let _users: ReducedUser[]

@Injectable()
export class GroupsService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Group') private groupModel: Model<Group>
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    console.log('dto', createGroupDto);
    const newGroup = await this.groupModel.create({
      ...createGroupDto,
      users: createGroupDto.users
    });
    console.log('submited', newGroup)

    if (createGroupDto.users) {
      createGroupDto.users.forEach(member => {
        this.addGroupToUser(member._id, { _id: newGroup._id, groupName: createGroupDto.groupName });
      })
    }


    return newGroup;
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

  async remove(id: string): Promise<DeleteResult> {
    const usersWithMission = await this.userModel.find({ 'userGroups._id': id }).lean().exec()

    for (const user of usersWithMission) {
      await this.removeGroupFromUser(user._id, id)
    }

    return this.groupModel.deleteOne({ _id: id }).exec()
  }

  async addGroupToUser(id: string, groupData: GroupData) {
    return this.userModel.findByIdAndUpdate(String(id),
      { $push: { userGroups: groupData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  async removeGroupFromUser(id: string, groupId: string) {

    return this.userModel.findByIdAndUpdate(id,
      { $pull: { userGroups: { _id: groupId } } },
      { new: true })
      .lean()
      .exec();
  }

}
