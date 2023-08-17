import { Document, Schema } from 'mongoose'

export const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    salt: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number },
    roles: { type: [String], default: ['basic'] },
    gameRole: { type: [String] },
})

export interface User extends Document {
    email: string;
    password: string;
    first_name: string;
    user_name: string;
    phone_number: string;
    created_at: number;
    updated_at: number;
    salt: string;
    roles: [string];
    gameRole: [string] | null;
}