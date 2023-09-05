import { Document, Schema } from 'mongoose'
import { ReducedUserSchema } from './user.entity';
import { ReducedUser } from './user.entity'

const VoteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vote: { type: Boolean, required: true },
})

const MissionGroupSchema = new Schema({
    groupName: { type: String },
    attendees: { type: Number },
    numberOfAttendees: { type: Number },
    votes: { type: [VoteSchema] }
})

export const EventSchema = new Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String },
    eventDate: { type: Number, required: true },
    eventCloseDate: { type: Number },
    createdAt: { type: Number },
    users: { type: [ReducedUserSchema] },
    groups: { type: [MissionGroupSchema] },
    blacklistedUsers: { type: [Schema.Types.ObjectId], ref: 'User' }
})

class BlacklistedUsers {
    _id: string
}

interface Vote {
    userId: string;
    vote: boolean
}

interface MissionGroup {
    _id: string;
    groupName: string;
    attendees: number;
    numberOfAttendees: number;
    votes: Vote[]
}

export interface Event extends Document {
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate: number;
    createdAt: number;
    users?: ReducedUser[]
    groups?: MissionGroup[]
    blacklistedUsers?: BlacklistedUsers[]
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};
