import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleData } from '../../entity/role.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BasicUserData, DeleteResult, User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Role') private roleModel: Model<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {

    const newRole = await this.roleModel.create({
      ...createRoleDto,
      users: createRoleDto.users
    })

    for (const member of createRoleDto?.users || []) {
      await this.addRoleToUser(String(member._id), { _id: String(newRole._id), roleName: newRole.roleName });
    }

  }

  async findAll() {
    return this.roleModel.find().lean().exec()
  }

  async findOne(id: string) {
    return this.roleModel.findById(id)
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).lean().exec()
  }

  async remove(id: string): Promise<DeleteResult> {
    const usersWithRole = await this.userModel.find({ 'roles._id': id }).lean().exec()

    for (const user of usersWithRole) {
      await this.removeRoleFromUser(user._id, id)
    }
    return this.roleModel.deleteOne({ _id: id }).exec();
  }

  async addRoleToUser(id: string, roleData: RoleData) {

    console.log(id, roleData);
    return await this.userModel.findByIdAndUpdate(id,
      { $push: { roles: roleData } },
      { new: true, upsert: true })
      .lean()
      .exec()

  }

  async removeRoleFromUser(id: string, userId: string) {
    return await this.userModel.findByIdAndUpdate(id,
      { $pull: { roles: { _id: userId } } },
      { new: true })
      .lean()
      .exec();
  }
}
