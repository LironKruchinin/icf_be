import { ReducedUser } from "src/entity/user.entity";

export class CreateEventDto {
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate: number;
    createdAt: number;
    users?: ReducedUser[];
    groups?: MissionGroupData[];
    blacklistedUsers?: BlacklistedUsers[]
}

class BlacklistedUsers {
    _id: string
}

class MissionGroupData {
    _id: string;
    groupName: string;
    attendees?: number;
    numberOfAttendees?: number;
}