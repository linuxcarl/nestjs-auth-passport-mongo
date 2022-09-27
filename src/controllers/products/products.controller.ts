import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Product } from 'src/entities/product.entitie';
import { ProductsService } from '../../serivices/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }
  @Post()
  async create(@Body() payload: any): Promise<Product> {
    return await this.productsService.create(payload);
  }
}
