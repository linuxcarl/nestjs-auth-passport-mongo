import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from '../products/products.module';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { User, UserSchema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      ,
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomerController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
