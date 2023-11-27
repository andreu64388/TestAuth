import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FogrotService } from './forgot.service';
import { ForgotPasswordDto } from './dto/forgot-send.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('forgot')
@Controller('forgot')
export class ForgotController {
  constructor(private forgotService: FogrotService) {}

  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({ type: ForgotPasswordDto, description: 'User email' })
  @Post()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotService.forgot(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Validate reset token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 404, description: 'Token is invalid or expired' })
  @Get('reset/:token')
  async resetPassword(@Param('token') token: string) {
    return this.forgotService.checkValidateToken(token);
  }

  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto, description: 'New password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 404, description: 'Token is invalid or expired' })
  @Post('reset/:token')
  async resetPassword2(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const password = resetPasswordDto.password;
    return this.forgotService.reset(token, password);
  }
}
