import { Document, Schema } from 'mongoose'

export const EventSchema = new Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String },
    eventDate: { type: Number, required: true },
    eventCloseDate: { type: Number },
    createdAt: { type: Number },
})

export interface Event extends Document {
    eventName: string;
    eventDescription: string;
    eventDate: number;
    eventCloseDate: number;
    createdAt: number;
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};
