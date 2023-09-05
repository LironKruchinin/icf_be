import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VoteDto } from './dto/vote.dto';
// import { Roles } from 'src/decorators/roles.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  // @Roles('admin', 'owner')
  create(@Body() createEventDto: CreateEventDto) {
    console.log(createEventDto);

    return this.eventService.create(createEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('voteMission/:id')
  async voteMission(@Param('id') eventId: string, @Body() voteDto: VoteDto) {
    const vote = await this.eventService.voteMission(eventId, voteDto.userId, voteDto.teamId, voteDto.vote)
    return vote
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
