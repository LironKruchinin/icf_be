import { Document, Schema } from 'mongoose'
import { GameRole } from 'src/modules/game-role/dto/create-game-role.dto';

const ReducedUserSchema = new Schema({
    first_name: { type: String, required: true },
    user_name: { type: String, required: true },
    userGroups: { type: [String] },
    gameRole: { type: [String] },
})

export const GroupSchema = new Schema({
    groupName: { type: String, required: true },
    groupDescription: { type: String },
    createdAt: { type: Number },
    users: {
        type: [{
            first_name: { type: String, required: true },
            user_name: { type: String, required: true },
            userGroups: { type: [String] },
            gameRole: { type: [String] },
        }]
    },
    groupRoles: { type: [String] }
})

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};


export interface Group extends Document {
    groupName: string;
    groupDescription: string;
    createdAt: number;
    users?: ReducedUser[]
    groupRoles?: { _id: string }[]
}

export interface ReducedUser extends Document {
    _id: string;
    first_name: string;
    user_name: string;
    gameRole: GameRole[];
}