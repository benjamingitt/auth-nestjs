import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserExistTelephone } from './guards';
import { createUserDto } from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto, createUserResponseDto } from './dto/user.response.dto';

@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'service error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Login user with test stend',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() auth: AuthDto) {
    return await this.authService.login(auth);
  }

  @ApiOperation({
    description: 'Registration user with test stend',
  })
  @ApiOkResponse({
    type: createUserResponseDto,
  })
  @UseGuards(UserExistTelephone)
  @Post('signup')
  async signUp(@Body() user: createUserDto) {
    return await this.authService.create(user);
  }
}
