import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    create(data: Partial<User>) {
        return this.userRepository.save(data);
    }

    findById(id: string) {
        return this.userRepository.findOne({ where: { id } })
    }

    async getProfile(userId: string) {
        const user = await this.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}

