import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from './decorators/currentUser.decorator';
import { EmailUserDto, UserDto } from './dto/user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { OptionsDto } from './dto/page.dto';

@ApiTags('Users')
@ApiInternalServerErrorResponse({ description: 'service error' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Find user with test stend',
  })
  @Get('')
  async findAll(@Query() dto: OptionsDto) {
    return await this.usersService.findAndCountAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException("This User doesn't exist");
    }

    return user;
  }

  @Patch(':email')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addEmail(
    @Param() param: EmailUserDto,
    @CurrentUser('id') currentUserId: number,
  ): Promise<any> {
    console.log(param.email);
    const userUpdate = await this.usersService.addEmail(
      param.email,
      currentUserId,
    );

    return userUpdate;
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() user: UserDto): Promise<any> {
    const userUpdate = await this.usersService.update(id, user);

    return userUpdate;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.usersService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    return 'Successfully deleted';
  }
}
