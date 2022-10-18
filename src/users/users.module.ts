import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from '../products/products.module';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomerController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
