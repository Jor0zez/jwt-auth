import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/register.schema';
import { InjectModel } from '@nestjs/mongoose/dist/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOneLogin(login: string) {
    const findOne = await this.userModel.findOne({ login }).exec();
    return findOne;
  }

  async findById(id: object) {
    const findById = await this.userModel.findById(id).exec();
    return findById;
  }

  async createUser(data: object) {
    const createUser = await this.userModel.create({ ...data });
    return createUser;
  }
}
