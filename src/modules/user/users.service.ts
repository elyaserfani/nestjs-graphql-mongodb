import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListUsersInput } from './dto/get-users-pagination.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  //Default Without Pagination
  // findAll() {
  //   return this.userModel.find().exec();
  // }

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().skip(offset).limit(limit).exec();
  }
  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel.findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true }).exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }
}
