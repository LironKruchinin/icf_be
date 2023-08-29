import { ReducedUser } from "src/entity/user.entity";

export class CreateEventDto {
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate: number;
    createdAt: number;
    users?: ReducedUser[];
}