import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entitie';

@Injectable()
export class ProductsService {
  private counter: number = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'celular',
      description: 'celular de 6 pulgadas',
      price: 1000,
      stock: 20,
      image: '',
    },
    {
      id: 2,
      name: 'celular3',
      description: 'celular de 6 pulgadas xiaomi',
      price: 1000,
      stock: 20,
      image: '',
    },
  ];
  findAll(): Product[] {
    return this.products;
  }
  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(product: CreateProductDto): Product {
    this.counter++;
    const newProduct = { id: this.counter, ...product };
    this.products.push({ ...newProduct });
    return newProduct;
  }
  update(id: number, changes: Product): Product {
    const product = this.findOne(id);
    if (product) {
      Object.assign(product, changes);
    }
    return product;
  }
}
