import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    async login(email: string, password: string) {
        const { _id: sub, roles }: User = await this.userService.validateUser(email, password)

        if (sub !== null) {
            const payload = { email, sub, roles }
            console.log(this.jwtService.sign(payload));

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

    async decodeJwtToken(token: string) {
        try {
            const decodedToken = this.jwtService.decode(token)
            return decodedToken
        } catch (err) {
            console.error('Invalid or expired token:', err.message);
            return null
        }
    }

}
