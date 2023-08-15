import { Body, ConflictException, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from '../user/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
        try {
            const missingUserInfo = await this.authService.isUserDataEmpty(registerUserDto)

            if (missingUserInfo.length > 0) throw new ConflictException(`${missingUserInfo} is empty`)

            else {
                console.log('registerDto', registerUserDto);

                const user = await this.userService.create(registerUserDto)
                return user
            }
        } catch (err) {
            throw err
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        try {
            const missingUserInfo = await this.authService.isUserDataEmpty(loginUserDto)
            if (missingUserInfo.length > 0) throw new ConflictException(`${missingUserInfo} is empty`)
            else {
                const { email, password } = loginUserDto
                console.log('login', email);

                const result = await this.authService.login(email, password)
                res.cookie('access_token', result, {
                    httpOnly: false,
                    secure: false,
                    sameSite: 'none',
                    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
                })
                // response.cookie('auth_token', result.access_token, {
                //     httpOnly: false, maxAge: 1000 * 60 * 60 * 24,
                //     sameSite: 'lax',
                //     secure: true
                // })
                return result
            }
        } catch (err) {
            throw new ConflictException(`is empty`)
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Post('profile/:id')
    async getProfileById(@Param('id') id: string) {
        try {
            console.log('id', id);
            const user = await this.userService.getUserById(id)
            return user
        } catch (err) {
            console.log('jwt route fail');
            throw err
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Req() req, @Body() body: any, @Res() res: Response) {
        try {
            if (Object.keys(body).length === 0) return
            // const email = body.email;
            console.log('body', body);

            const user = await this.userService.getUserByQuery(body)
            console.log('got user', user);


            return res.json(user);
        } catch (err) {

        }
    }


    @Post('users')
    async getUsers() {
        try {
            return this.userService.getAllUsers()
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
