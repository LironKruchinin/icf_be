import { PartialType } from '@nestjs/mapped-types';
import { CreateGameRoleDto } from './create-game-role.dto';

export class UpdateGameRoleDto extends PartialType(CreateGameRoleDto) {}
