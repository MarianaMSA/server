import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'; //o User é o nome da tabela
import { PrismaService } from 'src/prisma.service';
import { UserRole } from 'src/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.UserCreateInput, role: UserRole): Promise<User> {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('Email já está cadastrado');
    }

    const suer = await this.db.user.create({
      data,
    });

    return userExists;
  }
}
