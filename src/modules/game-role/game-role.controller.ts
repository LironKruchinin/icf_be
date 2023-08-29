import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameRoleService } from './game-role.service';
import { CreateGameRoleDto } from './dto/create-game-role.dto';
import { UpdateGameRoleDto } from './dto/update-game-role.dto';

@Controller('game-role')
export class GameRoleController {
  constructor(private readonly gameRoleService: GameRoleService) { }

  @Post()
  create(@Body() createGameRoleDto: CreateGameRoleDto) {
    return this.gameRoleService.create(createGameRoleDto);
  }

  @Get()
  findAll() {
    return this.gameRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameRoleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameRoleDto: UpdateGameRoleDto) {
    return this.gameRoleService.update(id, updateGameRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameRoleService.remove(id);
  }
}
