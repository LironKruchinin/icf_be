import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface RequestWithUser extends Request {
    user?: any
}

export interface DecodedUser {
    email: string;
    sub: string;
    roles: {
        _id: string;
        roleName: string;
        createdAt: number;
    }[];
    iat: number;
    exp: number;
}

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
    use(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedUser;
            const hasAdminRole = decoded.roles.some(role => role.roleName === 'Admin' || role.roleName === 'Owner')

            if (hasAdminRole) {
                req.user = decoded;
                next();
            } else {
                return res.status(403).json({ message: 'You do not have permission to perform this action.' });
            }

        } catch (err) {
            return res.status(401).json({ message: 'Authentication failed: Token is invalid.' });
        }
    }
}
