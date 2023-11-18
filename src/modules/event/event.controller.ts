import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { VoteDto } from './dto/vote.dto';
import { EventService } from './event.service';
// import { Roles } from '../../decorators/roles.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('voteMission/:id')
  async voteMission(@Param('id') eventId: string, @Body() voteDto: VoteDto[]) {
    voteDto.map(async vote => {
      const missionVote = await this.eventService.voteMission(eventId, vote.userId, vote.teamId, vote.vote)
      return missionVote
    })
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}


