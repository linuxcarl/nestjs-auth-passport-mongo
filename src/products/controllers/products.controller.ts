import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entitie';
import { ProductsService } from '../serivices/products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
  @Get(':id')
  async getProduct(@Param('id', MongoIdPipe) id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }
  @Post()
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return await this.productsService.create(payload);
  }
  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, payload);
  }
  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string): Promise<void> {
    return await this.productsService.delete(id);
  }
}
