import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/entity/event.entity';
import { UserSchema } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Event', schema: EventSchema }
    ])
  ],
  controllers: [EventController],
  providers: [EventService, UserService]
})
export class EventModule { }
