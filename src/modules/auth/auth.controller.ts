import { Body, ConflictException, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from '../user/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { UpdateUserDto } from '../user/dto/update.dto';

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

                const result = await this.authService.login(email, password)
                const user = await this.userService.getUserByQuery({ email: email })

                return { ...result, user }
            }
        } catch (err) {
            throw new ConflictException(`is empty`)
        }
    }

    @Get('users')
    async getUsers() {
        try {
            return this.userService.getAllUsers()
        } catch (err) {
            throw err
        }
    }

    @Patch('user/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            return this.userService.updateUser(id, updateUserDto)
        } catch (err) {
            throw err
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('profile/:id')
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

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Req() req, @Body() body: any, @Res() res: Response) {
        try {
            if (Object.keys(body).length === 0) return
            console.log('body', body);

            const user = await this.userService.getUserByQuery(body)
            // console.log('got user', user);


            return res.json(user);
        } catch (err) {

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
