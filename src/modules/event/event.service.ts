import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult, Event } from 'src/entity/event.entity';
import { BasicUserData, User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Event') private eventModel: Model<Event>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const users = (await this.userService.getAllUsers())
    const members = users.filter(user =>
      user.roles.includes('member') ||
      user.roles.includes('owner') ||
      user.roles.includes('admin')
    ).map(user => ({
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      user_name: user.user_name,
      gameRole: user.gameRole,
      userGroups: user.userGroups,
    }))
    createEventDto.users = members
    return this.eventModel.create(createEventDto)
  }

  async findAll() {
    return this.eventModel.find().lean().exec()
  }

  async findOne(id: string) {
    return this.eventModel.findById(id)
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).lean().exec()
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.eventModel.deleteOne({ _id: id }).exec();
  }

  addUserToRole(id: string, basicUserData: BasicUserData) {
    return this.eventModel.findByIdAndUpdate(id,
      { $push: { users: basicUserData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  removeUserToRole(id: string, userId: string) {
    return this.eventModel.findByIdAndUpdate(id,
      { $pull: { users: userId } },
      { new: true })
      .lean()
      .exec()
  }

}
