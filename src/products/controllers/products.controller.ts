import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { PublicRoute } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @PublicRoute()
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getProducts(@Query() params: FilterProductDto): Promise<Product[]> {
    return await this.productsService.findAll(params);
  }
  @Get(':id')
  @PublicRoute()
  async getProduct(@Param('id', MongoIdPipe) id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post()
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return await this.productsService.create(payload);
  }
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, payload);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string): Promise<void> {
    return await this.productsService.delete(id);
  }
}
