import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@ApiTags('google')
@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Initiate Google authentication' })
  @UseGuards(AuthGuard('google'))
  @Get()
  async googleAuth(@Req() req) {}

  @ApiOperation({ summary: 'Handle Google authentication callback' })
  @ApiResponse({ status: 302, description: 'Redirects to the specified URL' })
  @UseGuards(AuthGuard('google'))
  @Get('callback')
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;

    if (!user) {
      const loginFailedRedirect = this.configService.get<string>(
        'GOOGLE_LOGIN_FAILED_REDIRECT',
      );
      return res.redirect(loginFailedRedirect);
    }

    const token = await this.googleService.googleLogin(user);

    const redirectBaseUrl = this.configService.get<string>('BASE_URL');
    const authRedirect = this.configService.get<string>('GOOGLE_AUTH_REDIRECT');
    res.redirect(`${redirectBaseUrl}${authRedirect}/${token}`);
  }
}
