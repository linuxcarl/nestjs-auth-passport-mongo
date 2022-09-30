import { Product } from 'src/products/entities/product.entitie';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
