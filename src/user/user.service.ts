import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { HashAdapter } from '../common/hash/hash.adapter';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly hashAdapter: HashAdapter,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const isUnique = await this.findByEmail(createUserDto.email);
      if (isUnique) {
        throw new BadRequestException('Email already exists');
      }
      return await this.UserModel.create({
        ...createUserDto,
        password: await this.hashAdapter.hash(createUserDto.password),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findByEmail(email: string) {
    try {
      return await this.UserModel.findOne({ email });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findOne(id: number) {
    try {
      return await this.UserModel.findOne();
    } catch (error) {}
    return `This action returns a #${id} user`;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
