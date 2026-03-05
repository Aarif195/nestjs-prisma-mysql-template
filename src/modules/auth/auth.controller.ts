import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { Public } from '@/common/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Email already exists',
    type: ErrorResponseDto,
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // login
  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: ErrorResponseDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // google
  @Public()
  @Post('google')
  @HttpCode(200) // Usually 200 for logins
  @ApiOperation({ summary: 'Google OAuth login/register' })
  @ApiBody({ type: GoogleLoginDto })
  @ApiOkResponse({
    description: 'Google login successful',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Google authentication failed',
    type: ErrorResponseDto,
  })
  googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.googleLogin(googleLoginDto);
  }

  // Guards work
  @Get('profile')
  @ApiBearerAuth()
  @Roles(Role.student, Role.superadmin)
  @ApiOperation({ summary: 'Get profile (Protected Route Test)' })
  @ApiOkResponse({
    description: 'Returns access confirmation',
    schema: {
      example: {
        message: 'If you see this, AuthGuard and RolesGuard are working!',
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    description: 'Missing or invalid token',
  })
  @ApiForbiddenResponse({
    type: ErrorResponseDto,
    description: 'Role not authorized',
  })
  getProfile() {
    return {
      message: 'If you see this, AuthGuard and RolesGuard are working!',
    };
  }
}
