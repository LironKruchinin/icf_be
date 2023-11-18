export class CreateGameRoleDto {
    gameRoleName: string;
    gameRoleDescription: string;
    users: Member[];
}


export class CreateGroupDto {
    groupName: string;
    groupDescription: string;
    users: Member[];
}

class Member {
    _id: string;
    first_name: string;
    user_name: string[];
    gameRole: GameRole[];
}

export class GameRole {
    _id: string;
    roleName: string
}

