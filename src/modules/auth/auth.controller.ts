import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from '../user/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {

        try {
            const user = await this.userService.create(registerUserDto)
            return user
        } catch (err) {
            throw err
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        try {
            const { email, password } = loginUserDto
            return this.authService.login(email, password)
        } catch (err) {
            throw err
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: any) {
        const user = req.user
        console.log('hello');


        return 'testing'
    }
}
