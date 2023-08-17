import { Document, Schema } from 'mongoose'

export const EventSchema = new Schema({

})

export interface Event extends Document {
    eventName: string;
    // finalDate: string;
}