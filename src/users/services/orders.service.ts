import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    return await this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products');
  }

  async create(data: CreateOrderDto) {
    const newModel = await new this.orderModel(data);
    return newModel.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    return await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProduct(orderId: string, productsId: string[]) {
    const order = await this.orderModel.findById(orderId);
    productsId.forEach((productId) => order.products.push(productId));
    return order.save();
  }
}
