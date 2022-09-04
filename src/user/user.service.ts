import { MapperService } from '../common/mappers/mappers.service';
import { ResponseSocial } from './../services/auth/interface/response';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { HashAdapter } from '../common/hash/hash.adapter';
export type social = 'google' | 'facebook' | 'github';
@Injectable()
export class UserService {
  private enum: social;
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly hashAdapter: HashAdapter,
    private readonly mapperService: MapperService,
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
  async createSocialUser(createUserSocial: ResponseSocial, social: social) {
    let user = this.mapperService.socialResponse(createUserSocial, social);
    console.log(user);

    return await this.UserModel.create(user);
  }
  async findByEmail(email: string) {
    try {
      return await this.UserModel.findOne({ email });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findBySocial(id: string, social: social) {
    try {
      return await this.UserModel.findOne({ [social + 'ID']: id });
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
