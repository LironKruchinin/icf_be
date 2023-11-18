import { Document, Schema } from 'mongoose'
import { GameRole } from 'src/modules/game-role/dto/create-game-role.dto';

const MissionSchema = new Schema({
    _id: String,
    eventName: String,
    eventDate: String
})

const GameRoleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    gameRoleName: { type: String },
    gameRoleDescription: { type: String },
    users: [{
        first_name: String,
        user_name: String,
        gameRole: [{
            _id: Schema.Types.ObjectId,
            roleName: String,
        }],
    }]
})

const userGroups = new Schema({
    _id: Schema.Types.ObjectId,
    groupName: String,
    users: [
        {
            _id: Schema.Types.ObjectId,
            first_name: String,
            user_name: String,
            gameRole: [{
                _id: Schema.Types.ObjectId,
                roleName: String,
            }],
        }]
})

const RolesSchema = new Schema({
    roleName: { type: String, default: 'basic' },
    createdAt: { type: Number, default: () => Date.now() }
})

export const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    salt: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number },
    userGroups: [userGroups],
    roles: [RolesSchema],
    gameRole: [GameRoleSchema],
    user_color: { type: String },
    missions: [MissionSchema]
})


export const ReducedUserSchema = new Schema({
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
    // created_at: { type: Number, required: true },
    // updated_at: { type: Number },
    // roles: { type: [String], default: ['basic'] },
    userGroups: [{
        _id: String,
        groupName: String
    }],
    gameRole: [GameRoleSchema],
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
    roles: Roles[];
    missions?: Mission[];
    gameRole: GameRole[] | null;
    user_color: string;
    userGroups: Group[] | null;
}

export class BasicUserData {
    _id: string;
    first_name: string;
    user_name: string;
}

export class Mission {
    _id: string;
    eventName: string;
    eventDate: number;
}

export class GroupData {
    _id: string;
    groupName: string;
}

export class GameRoleData {
    _id: string;
    gameRoleName: string;
}

export interface ReducedUser {
    _id: string;
    email: string;
    first_name: string;
    user_name: string;
    gameRole: GameRole[] | null;
    userGroups: Group[] | null;
    missions?: Mission[]
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


export interface Roles {
    _id: string;
    roleName: string;
    createdAt: number
    users?: ReducedUser;
}
