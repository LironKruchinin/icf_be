import { Document, Schema } from 'mongoose'
import { ReducedUserSchema } from './user.entity';
import { ReducedUser } from './group.entity'

export const GameRoleSchma = new Schema({
    gameRoleName: { type: String, required: true },
    gameRoleDescription: { type: String },
    createdAt: { type: Number },
    users: { type: [ReducedUserSchema] },
})

export interface GameRole extends Document {
    gameRoleName: string;
    gameRoleDescription: string;
    createdAt: number;
    users?: ReducedUser[]
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};
