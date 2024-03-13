import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Patch,
  Param,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './user-model';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UpdatePasswordDto} from './dto/update-password.dto';
import {UpdateEmailDto} from './dto/update-email.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({summary: 'User register'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.createUser(userDto);
      return {success: true, user};
    } catch (error) {
      console.error('Error during registration:', error);
      return {success: false, error: error.message};
    }
  }

  @UsePipes(ValidationPipe)
  @Post(':email/update-password')
  async updatePassword(@Param('email') email: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<any> {
    try {
      if (!email || !updatePasswordDto || !updatePasswordDto.newPassword) {
        throw new BadRequestException('Invalid input. Email and newPassword are required.');
      }

      await this.usersService.updatePassword(updatePasswordDto);

      return {success: true, message: 'Password was changed', statusCode: 200};
    } catch (error) {
      return {success: false, message: error.message, statusCode: 400};
    }
  }

  @UsePipes(ValidationPipe)
  @Post(':email/update-email')
  async updateEmail(@Param('email') email: string, @Body() updateEmailDto: UpdateEmailDto): Promise<any> {
    try {
      const {email, newEmail} = updateEmailDto;
      if (!email || !updateEmailDto || !updateEmailDto.email) {
        throw new BadRequestException('Invalid input. Email are required.');
      }
      if (email.toLowerCase() === newEmail.toLowerCase()) {
        throw new BadRequestException('You already have this email');
      }
      await this.usersService.updateEmail(updateEmailDto);
      return {success: true, message: 'Email was changed', statusCode: 200};
    } catch (error) {
      return {success: false, message: error.message, statusCode: 400};
    }
  }

  // @Post(':email/update-password')
  // async updatePassword(@Param('email') email: string, @Body() updatePasswordDto: UpdatePasswordDto): Promise<any> {
  //   try {
  //     // Проверка на пустые значения
  //     if (
  //       !email ||
  //       email === 'undefined' ||
  //       !updatePasswordDto ||
  //       !updatePasswordDto.newPassword ||
  //       updatePasswordDto.newPassword.trim() === ''
  //     ) {
  //       throw new BadRequestException('Invalid input. Email and newPassword are required.');
  //     }
  //
  //     await this.usersService.updatePassword(updatePasswordDto);
  //     Logger.log(`Password updated successfully for user with email: ${email}`, 'UpdatePassword');
  //     return {success: true, message: 'Password was changed'};
  //   } catch (error) {
  //     Logger.error(
  //       `Failed to update password for user with email: ${email}. Error: ${error.message}`,
  //       null,
  //       'UpdatePassword',
  //     );
  //     // Явное возвращение ошибки с кодом состояния 400 (Bad Request)
  //     return {success: false, message: error.message, statusCode: 400};
  //   }
  // }

  // @Post(':email/update-password')
  // async updatePassword(@Param('email') email: string, @Body('newPassword') newPassword: string): Promise<any> {
  //   try {
  //     await this.usersService.updatePassword(email, newPassword);
  //     Logger.log(`Password updated successfully for user with email: ${email}`, 'UpdatePassword');
  //     return {success: true, message: 'Password was changed'};
  //   } catch (error) {
  //     Logger.error(
  //       `Failed to update password for user with email: ${email}. Error: ${error.message}`,
  //       null,
  //       'UpdatePassword',
  //     );
  //     return {success: false, message: error.message};
  //   }
  // }
}
