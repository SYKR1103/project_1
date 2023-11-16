import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {

constructor(
  private readonly userService : UserService
) {}

async createUser(CreateUserDto:CreateUserDto) {
  try{
    return await this.userService.createUser(CreateUserDto)
  } catch(e) {
    console.log(e)
  throw new HttpException("not found", HttpStatus.INTERNAL_SERVER_ERROR)}
}


async loginUser(LoginUserDto:LoginUserDto) {
  try {
    const user = await this.userService.findUserByEmail(LoginUserDto.email)
    const isMatched = await user.checkPassword(LoginUserDto.password)
    if (!isMatched) throw new HttpException("whatttt", HttpStatus.BAD_REQUEST)
  } catch(e) {
    console.log(e)
  throw new HttpException("not found", HttpStatus.INTERNAL_SERVER_ERROR)}
}




}
