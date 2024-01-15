import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const current_password = user.password;
    user.password = undefined;
    if (user) {
      const isMatch = await bcrypt.compare(password, current_password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }
}
