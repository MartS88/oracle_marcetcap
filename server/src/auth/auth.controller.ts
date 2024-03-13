import {Body, Controller, Param, Post, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {AuthService} from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

//
// @Post('/login')
// async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
//   try {
//     const result = await this.authService.login(userDto);
//
//     res.cookie('token', result.token, {httpOnly: true, sameSite: 'none', secure: true});
//
//     // Отправка ответа на клиент
//     res.status(200).json(result);
//   } catch (error) {
//     // Обработка ошибок аутентификации
//     res.status(401).json({message: 'Authentication failed'});
//   }
// }

//
// import {Body, Controller, Param, Post, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
// import {ApiTags} from '@nestjs/swagger';
// import {CreateUserDto} from '../users/dto/create-user.dto';
// import {AuthService} from './auth.service';
// import {Response} from 'express';
// @ApiTags('Authorization')
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
//
//   @Post('login')
//   async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
//     try {
//       const result = await this.authService.login(userDto, res);
//       return res.json(result);
//     } catch (error) {
//       // Обработка ошибок входа
//       return res.status(error.getStatus()).json({message: error.message});
//     }
//   }
//
//   @Post('registration')
//   async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
//     try {
//       const result = await this.authService.registration(userDto, res);
//       return res.json(result);
//     } catch (error) {
//       // Обработка ошибок регистрации
//       return res.status(error.getStatus()).json({message: error.message});
//     }
//   }
// }
