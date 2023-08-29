export class CreateGameRoleDto {
    gameRoleName: string;
    gameRoleDescription: string;
    members: member[];
}


export class CreateGroupDto {
    groupName: string;
    groupDescription: string;
    members: member[];
}

class member {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}

export class GameRole {
    _id: string;
    roleName: string
}

