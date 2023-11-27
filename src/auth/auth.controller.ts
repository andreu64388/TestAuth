import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() body: RegisterUserDto) {
    return this.authService.login(body);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return { user: req.user };
  }
}
