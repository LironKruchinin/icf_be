import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult, Event } from 'src/entity/event.entity';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private eventModel: Model<Event>) { }

  async create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto)
    // return 'This action adds a new event';
  }

  async findAll() {
    return this.eventModel.find().lean().exec()
  }

  async findOne(id: string) {
    return this.eventModel.findById(id)
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.eventModel.deleteOne({ _id: id }).exec();
  }

}
