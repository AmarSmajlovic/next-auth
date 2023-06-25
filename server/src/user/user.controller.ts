import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return await this.userService.findUserById(id);
  }
}
