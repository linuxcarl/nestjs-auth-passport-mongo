import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@ApiTags('Products')
@UseGuards(ApiKeyGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getProducts(@Query() params: FilterProductDto): Promise<Product[]> {
    return await this.productsService.findAll(params);
  }
  @Get(':id')
  @SetMetadata('isPublic', true)
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
