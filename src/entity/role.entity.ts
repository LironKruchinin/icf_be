import { Document, Schema } from 'mongoose'
import { ReducedUserSchema } from './user.entity';
import { ReducedUser } from './user.entity'

export const RoleSchma = new Schema({
    roleName: { type: String, required: true },
    createdAt: { type: Number },
    users: { type: [ReducedUserSchema] },
})

export interface Role extends Document {
    roleName: string;
    createdAt: number;
    users?: ReducedUser[]
}

export type DeleteResult = {
    n?: number;
    ok?: number;
    deletedCount?: number;
};
