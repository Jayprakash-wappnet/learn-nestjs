import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }
}

