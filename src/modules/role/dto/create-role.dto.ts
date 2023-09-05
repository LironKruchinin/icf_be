import { GameRole } from "src/modules/game-role/dto/create-game-role.dto";

export class CreateRoleDto {
    groupName: string;
    users: member[];
}

class member {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}