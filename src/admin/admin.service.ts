import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsersInfo() {
    return await this.userRepository.find();
  }

  async removeClient(id: string) {
    await this.userRepository.delete(id);
  }
}
