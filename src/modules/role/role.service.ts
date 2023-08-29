import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
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

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto)
  }

  findAll() {
    return this.roleModel.find().lean().exec()
  }

  findOne(id: string) {
    return this.roleModel.findById(id)
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).lean().exec()
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roleModel.deleteOne({ _id: id }).exec();
  }

  addUserToRole(id: string, basicUserData: BasicUserData) {
    return this.roleModel.findByIdAndUpdate(id,
      { $push: { users: basicUserData } },
      { new: true, upsert: true })
      .lean()
      .exec()
  }

  removeUserToRole(id: string, userId: string) {
    return this.roleModel.findByIdAndUpdate(id,
      { $pull: { users: userId } },
      { new: true })
      .lean()
      .exec()
  }
}
