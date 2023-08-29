import { Document, Schema } from 'mongoose'
import { ReducedUserSchema } from './user.entity';
import { ReducedUser } from './user.entity'

export const EventSchema = new Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String },
    eventDate: { type: Number, required: true },
    eventCloseDate: { type: Number },
    createdAt: { type: Number },
    users: { type: [ReducedUserSchema] },
})

export interface Event extends Document {
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate: number;
    createdAt: number;
    users?: ReducedUser[]
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};
