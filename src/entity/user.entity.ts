import { Document, Schema } from 'mongoose'
import { GameRole } from 'src/modules/game-role/dto/create-game-role.dto';

const GameRoleSchema = new Schema({
    _id: { type: String },
    gameRoleName: { type: String }
})

const userGroups = new Schema({
    _id: { type: String },
    groupName: { type: String }
})


export interface ReducedUser {
    _id: string;
    email: string;
    first_name: string;
    user_name: string;
    gameRole: GameRole[] | null;
    userGroups: Group[] | null;
}

class Group {
    _id: string;
    groupName: string;
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};


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
    user_color: { type: String }
})

export interface User extends Document {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    user_name: string;
    phone_number: string;
    created_at: number;
    updated_at: number;
    salt: string;
    roles: string[];
    gameRole: GameRole[] | null;
    user_color: string;
    userGroups: Group[] | null;
}

export const ReducedUserSchema = new Schema({
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
    // created_at: { type: Number, required: true },
    // updated_at: { type: Number },
    // roles: { type: [String], default: ['basic'] },
    userGroups: { type: [userGroups] },
    gameRole: { type: [GameRoleSchema] },
})


export class BasicUserData {
    _id: string;
    first_name: string;
    user_name: string;
}