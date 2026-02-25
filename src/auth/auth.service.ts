import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.userService.findByEmail(dto.email);

        if(existingUser){
            throw new BadRequestException("The user with same email already exists")
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        await this.userService.create({
            ...dto,
            password: hashedPassword,
        })
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if(!user){
            throw new BadRequestException("Invalid credentials")
        }

        const isPasswordMatched = await bcrypt.compare(dto.password, user.password)

        if(!isPasswordMatched) {
            throw new BadRequestException("Invalid")
        }

        return this.generateToken(user.id, user.email)
    }

    async generateToken(userId: string, email: string) {
        const payload = {sub: userId, email}

        return this.jwtService.sign(payload)
    }
}
