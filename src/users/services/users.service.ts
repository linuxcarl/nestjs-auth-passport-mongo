import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find({}, { __v: 0, password: 0 });
  }

  async findOne(id: string) {
    return this.userModel.findById(id, { __v: 0, password: 0 });
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }, { __v: 0 }).exec();
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const { _id } = await newModel.save();
    const user = await this.findOne(_id);
    return user;
  }

  async update(id: string, changes: UpdateUserDto) {
    await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
