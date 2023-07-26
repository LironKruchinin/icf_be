import { Body, ConflictException, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
        console.log('hello');

        try {
            const missingUserInfo = await this.authService.isUserDataEmpty(registerUserDto)

            if (missingUserInfo.length > 0) throw new ConflictException(`${missingUserInfo} is empty`)

            else {
                const user = await this.userService.create(registerUserDto)
                return user
            }
        } catch (err) {
            throw err
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginDto) {
        try {
            console.log('hello');

            const missingUserInfo = await this.authService.isUserDataEmpty(loginUserDto)
            if (missingUserInfo.length > 0) throw new ConflictException(`${missingUserInfo} is empty`)
            else {
                const { email, password } = loginUserDto
                return this.authService.login(email, password)
            }
        } catch (err) {
            throw err
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Body() body: any) {
        const email = body.email
        console.log(email);

        return { email: email }
    }

    @Post('users')
    async getUsers() {
        try {
            return this.authService.getAllUsers()
        } catch (err) {
            throw err
        }
    }
    // @UseGuards(JwtAuthGuard)
    // @Post('profile/:id')
    // async getProfile(@Param('id') id: string) {
    //     console.log(id);
    //     try {
    //         const user = await this.userService.getUserById(id)
    //         return user
    //     } catch (err) {
    //         throw err
    //     }
    // }
}
