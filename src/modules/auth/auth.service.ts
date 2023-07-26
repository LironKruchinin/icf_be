import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    async login(email: string, password: string) {
        const sub: string | null = await this.userService.validateUser(email, password)

        if (sub !== null) {
            const payload = { email, sub }
            return { access_token: this.jwtService.sign(payload) }
        } else {
            throw new ConflictException('Incorrect password')
        }
    }

    async isUserDataEmpty(userInfo) {
        const emptyKeys = []

        for (const [key, value] of Object.entries(userInfo)) {
            if (!value) emptyKeys.push(key)
        }
        return emptyKeys
    }

    async getAllUsers() {
        try {
            return this.userService.getAllUsers()
        } catch (err) {
            throw new ConflictException('No users to return')
        }
    }
}
