import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll(params?: FilterProductDto): Promise<Product[]> {
    const filters: FilterQuery<Product> = {};
    const { limit = 500, offset = 0, minPrice, maxPrice, name } = params || {};
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (name) {
      filters.name = new RegExp(name, 'i');
    }
    return await this.productModel
      .find({ ...filters })
      .populate('brand')
      .skip(offset)
      .limit(limit)
      .exec();
  }
  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }
  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...product } },
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return updatedProduct;
  }
  async delete(id: string): Promise<void> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return await this.productModel.findByIdAndDelete({ _id: id });
  }
}
