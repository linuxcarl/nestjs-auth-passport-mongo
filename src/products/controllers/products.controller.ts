import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entitie';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ProductsService } from '../serivices/products.service';

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
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return await this.productsService.create(payload);
  }
}
