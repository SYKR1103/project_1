import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
  @InjectRepository(User)
  private userRepo : Repository<User>) {}


    async createUser(CreateUserDto:CreateUserDto) {
      const newuser = await this.userRepo.create(CreateUserDto)
      await this.userRepo.save(newuser)
      return newuser
    }
  
    async loginUser(LoginUserDto:LoginUserDto) {
      const user = await this.userRepo.findOneBy(LoginUserDto)
    }


    async findUserByEmail(email:string) {
      const user = await this.userRepo.findOneBy({email})
      if (user) return user
      throw new HttpException("not found", HttpStatus.NOT_FOUND)
    }

}
