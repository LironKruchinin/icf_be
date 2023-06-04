import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,

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
            return this.userService.login(email, password)
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
