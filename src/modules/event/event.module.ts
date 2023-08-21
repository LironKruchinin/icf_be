import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/entity/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema }
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule { }