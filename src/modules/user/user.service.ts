import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/entity/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(registerDto: RegisterDto) {
        const {
            email,
            first_name,
            user_name,
            password,
            phone_number
        } = registerDto
        const userExists = await this.isUserExists({ email })

        if (userExists) {
            console.log('User Exists');
            throw new ConflictException('User already exists')
        }
        const saltRounds = +process.env.SALT_ROUNDS
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        registerDto.password = hashedPassword.slice(
            -(hashedPassword.length - process.env.SALT_SECRET.length))
        const hashedPhoneNumber = await bcrypt.hash(phone_number, salt)
        registerDto.phone_number = hashedPhoneNumber.slice(
            -(hashedPhoneNumber.length - process.env.SALT_SECRET.length))
        registerDto['salt'] = salt
        registerDto['created_at'] = Date.now()
        registerDto['roles'] = ['basic']
        return this.userModel.create(registerDto)
    }

    async validateUser(email: string, userPassword: string) {
        const user: User | null = await this.isUserExists({ email })
        // console.log('user', user);

        const isPasswordMatch = await bcrypt.compare(
            userPassword,
            `${process.env.SALT_SECRET}${user.password}`
        )

        if (isPasswordMatch) return user
        else { return null }
    }

    async isUserExists(query) {

        const existingUser = await this.userModel.findOne({ ...query })

        console.log(existingUser, query);

        if (existingUser) return existingUser
        else return null
        // return null
    }

    async getUserById(id: string) {
        const user: User | null = await this.userModel.findById(id, '-password -salt -phone_number -__v').exec()

        delete user.password
        delete user.salt
        delete user.phone_number
        delete user.__v
        return user
    }

    async getUserByQuery(query: {}): Promise<User | null> {
        const user: User | null = await this.userModel.findOne(query, '-password -salt -phone_number -__v').lean();

        if (user) {
            delete user.password
            delete user.salt
            delete user.phone_number
            delete user.__v
            return user
        }

        return user
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).lean().exec()
    }

    async getAllUsers() {
        try {
            const users = this.userModel.find({}, '-password -salt -__v') //.lean().exec()
            return users
        } catch (err) {
            console.log('err');
        }
    }
}
