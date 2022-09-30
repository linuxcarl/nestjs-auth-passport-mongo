import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomerController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
