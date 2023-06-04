import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
    async jwtToken(email: string, sub: string) {
        const payload = { email, sub }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
