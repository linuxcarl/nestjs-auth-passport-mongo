import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entitie';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll() {
    return await this.productModel.find().exec();
  }
  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
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
    return await this.productModel.findByIdAndDelete({ _id: id });
  }
}
