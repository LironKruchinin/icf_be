import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult, Event } from 'src/entity/event.entity';
import { Mission, ReducedUser, User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GroupsService } from '../groups/groups.service';

let _users: ReducedUser[]
@Injectable()
export class EventService {
  constructor(
    private readonly userService: UserService,
    private readonly groupsService: GroupsService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Event') private eventModel: Model<Event>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    console.log(createEventDto);

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

    createEventDto.groups = await this.groupsService.findAll()

    createEventDto.users = members
    _users = members
    const event = await this.eventModel.create(createEventDto)

    for (const member of members) {

      const isBlacklisted = event.blacklistedUsers?.some(
        blacklistedUser => String(blacklistedUser._id) === String(member._id)
      )
      if (isBlacklisted) {
        console.log(`Skipping blacklisted member ${member._id}`)
        continue
      }
      await this.addMissionToUser(member._id, {
        _id: event._id,
        eventName: event.eventName,
        eventDate: event.eventDate,
      })

    }
    return event
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
    const usersWithMission = await this.userModel.find({ 'missions._id': id }).lean().exec()

    for (const user of usersWithMission) {
      await this.removeMissionFromUser(user._id, id)
    }

    return this.eventModel.deleteOne({ _id: id }).exec()
  }

  async voteMission(eventId: string, userId: string, teamId: string, vote: boolean) {
    console.log(eventId, userId, teamId, vote);
    const event = await this.eventModel.findById(eventId)

    if (!event) { throw new Error('Event not found') }
    const group = event.groups.find(g => g._id.toString() === teamId)
    const existingVote = group.votes.find(v => v.userId.toString() === userId)

    if (existingVote) {
      existingVote.vote = vote
    } else {
      group.votes.push({ userId, vote })
    }

    return event.save()
  }

  async addMissionToUser(id: string, missionData: Mission) {
    return this.userModel.findByIdAndUpdate(id,
      { $push: { missions: missionData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  async removeMissionFromUser(id: string, missionId: string) {

    return this.userModel.findByIdAndUpdate(id,
      { $pull: { missions: { _id: missionId } } },
      { new: true })
      .lean()
      .exec();
  }

}
