import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById({ _id: id }).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await new this.customerModel(data);
    return newCustomer.save();
  }

  async update(id: string, changes: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.customerModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }
}
