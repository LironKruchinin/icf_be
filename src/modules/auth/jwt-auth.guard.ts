import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    handleRequest(err, user, info, context: ExecutionContext, status?) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        console.log(user);

        // Custom role verification logic
        const hasAdminRole = user.roles && user.roles.some(role => role.roleName === 'Admin' || role.roleName === 'Owner');
        if (!hasAdminRole) {
            throw new UnauthorizedException('You do not have permission to perform this action');
        }

        return user;
    }
}
